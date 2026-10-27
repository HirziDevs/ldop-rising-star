import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();
const SAMPLE_PASSWORD = "Sample123!";

type SampleRow = {
  lapanganId: string;
  namaLapangan: string;
  harga: string;
  aktif: string;
  userId: string;
  namaUser: string;
  emailUser: string;
  bookingId: string;
  hariDariSekarang: string;
  jamMulaiUtc: string;
  status: string;
};

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64);
  return `${salt}:${key.toString("hex")}`;
}

function readSampleCsv(): SampleRow[] {
  const csv = readFileSync(resolve("prisma/data-awal/contoh.csv"), "utf8").trim();
  const [headerLine, ...lines] = csv.split(/\r?\n/);
  const headers = headerLine.split(",");

  return lines.filter(Boolean).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])) as unknown as SampleRow;
  });
}

function makeSlot(daysFromToday: number, startHourUtc: number) {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() + daysFromToday);
  start.setUTCHours(startHourUtc, 0, 0, 0);

  const end = new Date(start);
  end.setUTCHours(startHourUtc + 2);

  return { tanggalAwal: start, tanggalAkhir: end };
}

async function main() {
  const rows = readSampleCsv();
  const passwordHash = hashPassword(SAMPLE_PASSWORD);
  const usersByEmail = new Map(rows.map((row) => [row.emailUser, row]));
  const lapanganById = new Map(rows.map((row) => [row.lapanganId, row]));
  const users = new Map<string, { id: string }>();
  const lapangan = new Map<string, { id: string }>();

  for (const row of usersByEmail.values()) {
    const user = await prisma.user.upsert({
      where: { email: row.emailUser },
      create: {
        id: row.userId,
        nama: row.namaUser,
        email: row.emailUser,
        passwordHash,
        role: "USER",
      },
      update: { nama: row.namaUser, passwordHash, role: "USER" },
    });
    users.set(row.emailUser, user);
  }

  for (const row of lapanganById.values()) {
    const court = await prisma.lapangan.upsert({
      where: { id: row.lapanganId },
      create: {
        id: row.lapanganId,
        nama: row.namaLapangan,
        harga: Number(row.harga),
        aktif: row.aktif === "true",
        gambar: null,
      },
      update: {
        nama: row.namaLapangan,
        harga: Number(row.harga),
        aktif: row.aktif === "true",
      },
    });
    lapangan.set(row.lapanganId, court);
  }

  for (const row of rows) {
    const slot = makeSlot(Number(row.hariDariSekarang), Number(row.jamMulaiUtc));
    const user = users.get(row.emailUser);
    const court = lapangan.get(row.lapanganId);

    if (!user || !court) throw new Error(`Relasi booking tidak ditemukan untuk ${row.bookingId}.`);

    await prisma.booking.upsert({
      where: { id: row.bookingId },
      create: {
        id: row.bookingId,
        userId: user.id,
        lapanganId: court.id,
        ...slot,
        status: row.status,
      },
      update: {
        userId: user.id,
        lapanganId: court.id,
        ...slot,
        status: row.status,
      },
    });
  }

  console.log("Sample berhasil disiapkan: 4 user, 2 lapangan, dan 6 booking.");
  console.log(`Kata sandi semua akun sample: ${SAMPLE_PASSWORD}`);
}

main()
  .catch((error: unknown) => {
    console.error("Gagal menyiapkan sample Prisma:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

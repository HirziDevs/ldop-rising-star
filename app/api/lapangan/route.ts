import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET /api/lapangan — Daftar lapangan aktif (publik, tanpa auth). */
export async function GET() {
  try {
    const lapangan = await prisma.lapangan.findMany({
      where: { aktif: true },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, harga: true },
    });

    return NextResponse.json(lapangan);
  } catch {
    return NextResponse.json(
      { message: "Gagal memuat daftar lapangan." },
      { status: 500 },
    );
  }
}

export async function POST() {
  // Admin-only — tetap placeholder
  const { requireApiUser } = await import("@/lib/guard");
  const { notImplemented } = await import("@/lib/placeholder");
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

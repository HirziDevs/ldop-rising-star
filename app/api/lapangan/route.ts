import { NextResponse } from "next/server";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth";
import { requireApiUser } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { deleteImage, imageUrl, uploadImage } from "@/lib/r2";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function error(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function GET() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const daftar = await prisma.lapangan.findMany({
    where: isAdmin ? undefined : { aktif: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    daftar.map((item) => ({
      ...item,
      gambarUrl: item.gambar ? imageUrl(item.gambar) : null,
    })),
  );
}

export async function POST(req: Request) {
  const { response } = await requireApiUser(["ADMIN"]);
  if (response) return response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return error("Request harus berupa multipart/form-data.", 400);
  }
  
  const nama = String(form.get("nama") ?? "").trim();
  const harga = Number(form.get("harga"));
  const aktif = form.get("aktif") !== "false";
  const file = form.get("gambar");

  if (nama.length < 3 || nama.length > 100) {
    return error("Nama lapangan harus 3–100 karakter.", 400);
  }
  if (!Number.isInteger(harga) || harga <= 0) {
    return error("Harga harus berupa bilangan bulat lebih dari 0.", 400);
  }

  
  let gambar: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE) {
      return error("Ukuran gambar maksimal 2 MB.", 413);
    }
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return error("Format gambar harus JPG, PNG, atau WebP.", 415);
    }

    let output: Buffer;
    try {
      
      output = await sharp(Buffer.from(await file.arrayBuffer()))
        .rotate()
        .resize(1600, 900, { fit: "cover" })
        .webp({ quality: 80 })
        .toBuffer();
    } catch {
      return error("File bukan gambar yang valid.", 400);
    }

    const key = `lapangan/${randomUUID()}.webp`;
    try {
      await uploadImage(key, output);
    } catch {
      return error("Gagal mengunggah gambar. Coba lagi.", 502);
    }
    gambar = key;
  }
  
  try {
    const lapangan = await prisma.lapangan.create({
      data: { nama, harga, aktif, gambar },
    });

    return NextResponse.json(
      { ...lapangan, gambarUrl: gambar ? imageUrl(gambar) : null },
      { status: 201 },
    );
  } catch {
    if (gambar) await deleteImage(gambar).catch(() => {});
    return error("Gagal menyimpan lapangan. Coba lagi.", 500);
  }
}
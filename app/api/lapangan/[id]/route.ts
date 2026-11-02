import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET /api/lapangan/[id] — Detail lapangan (publik). */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const lapangan = await prisma.lapangan.findUnique({
      where: { id },
      select: { id: true, nama: true, harga: true, aktif: true },
    });

    if (!lapangan || !lapangan.aktif) {
      return NextResponse.json(
        { message: "Lapangan tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json(lapangan);
  } catch {
    return NextResponse.json(
      { message: "Gagal memuat detail lapangan." },
      { status: 500 },
    );
  }
}

export async function PUT() {
  const { requireApiUser } = await import("@/lib/guard");
  const { notImplemented } = await import("@/lib/placeholder");
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

export async function PATCH() {
  const { requireApiUser } = await import("@/lib/guard");
  const { notImplemented } = await import("@/lib/placeholder");
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

export async function DELETE() {
  const { requireApiUser } = await import("@/lib/guard");
  const { notImplemented } = await import("@/lib/placeholder");
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

import { notImplemented } from "@/lib/placeholder";
import { requireApiUser } from "@/lib/guard";

/** GET /api/bookings - Mengambil daftar booking. */
export async function GET() {
  const { response } = await requireApiUser(["USER", "ADMIN"]);
  return response ?? notImplemented();
}

/** POST /api/bookings - Membuat booking baru. */
export async function POST() {
  const { response } = await requireApiUser(["USER", "ADMIN"]);
  return response ?? notImplemented();
}

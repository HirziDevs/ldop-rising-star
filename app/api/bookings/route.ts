import { notImplemented } from "@/lib/placeholder";
import { requireApiUser } from "@/lib/guard";

export async function GET() {
  const { response } = await requireApiUser(["USER", "ADMIN"]);
  return response ?? notImplemented();
}

export async function POST() {
  const { response } = await requireApiUser(["USER", "ADMIN"]);
  return response ?? notImplemented();
}

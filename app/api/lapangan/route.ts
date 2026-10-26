import { notImplemented } from "@/lib/placeholder";
import { requireApiUser } from "@/lib/guard";

export const GET = notImplemented;

export async function POST() {
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

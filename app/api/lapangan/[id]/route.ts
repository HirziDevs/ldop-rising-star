import { notImplemented } from "@/lib/placeholder";
import { requireApiUser } from "@/lib/guard";

export const GET = notImplemented;

export async function PUT() {
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

export async function PATCH() {
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

export async function DELETE() {
  const { response } = await requireApiUser(["ADMIN"]);
  return response ?? notImplemented();
}

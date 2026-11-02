import { Navbar } from "@/components/navbar";
import { requireUser } from "@/lib/guard";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireUser(["ADMIN"]);
  return (
    <>
      <Navbar variant="admin" />
      <main className="flex-1">{children}</main>
    </>
  );
}

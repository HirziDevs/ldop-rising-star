import { Navbar } from "@/components/navbar";
import { requireUser } from "@/lib/guard";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireUser(["ADMIN"]);
  return (
    <>
      <Navbar variant="admin" />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
} 

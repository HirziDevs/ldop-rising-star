import { Navbar } from "@/components/navbar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (session?.user) redirect(session.user.role === "ADMIN" ? "/admin" : "/booking");
  return <><Navbar variant="auth" /><main className="mx-auto w-full max-w-md px-4 py-8">{children}</main></>;
}

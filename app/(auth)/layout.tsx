import { Navbar } from "@/components/navbar";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><Navbar variant="auth" /><main className="mx-auto w-full max-w-md px-4 py-8">{children}</main></>;
}

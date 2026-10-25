import { Navbar } from "@/components/navbar";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><Navbar variant="public" />{children}</>;
}

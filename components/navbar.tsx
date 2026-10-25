import Link from "next/link";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  variant: "public" | "auth" | "admin";
};

export function Navbar({ variant }: NavbarProps) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={variant === "admin" ? "/admin" : "/"} className="font-semibold tracking-tight">
          {variant === "admin" ? "Admin · Booking Lapangan" : "Booking Lapangan"}
        </Link>

        {variant === "public" ? (
          <nav aria-label="Navigasi utama" className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button asChild variant="ghost" size="sm"><Link href="/lapangan">Lapangan</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/booking">Booking</Link></Button>
            <Button asChild size="sm"><Link href="/login">Masuk</Link></Button>
          </nav>
        ) : null}

        {variant === "auth" ? (
          <Button asChild variant="outline" size="sm"><Link href="/">Kembali ke beranda</Link></Button>
        ) : null}

        {variant === "admin" ? (
          <nav aria-label="Navigasi admin" className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button asChild variant="ghost" size="sm"><Link href="/admin">Ringkasan</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/admin/booking">Booking</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/admin/lapangan">Lapangan</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/admin/settings">Pengaturan</Link></Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

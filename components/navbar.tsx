import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  variant: "public" | "auth" | "admin";
};

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export async function Navbar({ variant }: NavbarProps) {
  const session = variant === "auth" ? null : await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={variant === "admin" ? "/admin" : "/"} className="font-semibold tracking-tight">
          Booking Lapangan
        </Link>

        {variant === "public" ? (
          <nav aria-label="Navigasi utama" className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button asChild variant="ghost" size="sm"><Link href="/lapangan">Lapangan</Link></Button>
            {session ? (
              <>
                <Button asChild variant="ghost" size="sm"><Link href="/booking">Booking</Link></Button>
                {session.user.name ? <span className="hidden text-sm text-muted-foreground sm:inline">{session.user.name}</span> : null}
                {isAdmin ? (
                  <Button asChild variant="outline" size="sm"><Link href="/admin">Admin</Link></Button>
                ) : null}
                <form action={logoutAction}>
                  <Button type="submit" variant="outline" size="sm">Keluar</Button>
                </form>
              </>
            ) : (
              <Button asChild size="sm"><Link href="/login">Masuk</Link></Button>
            )}
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
            <Button asChild variant="ghost" size="sm"><Link href="/admin/users">Pengguna</Link></Button>
            {session?.user.name ? <span className="hidden text-sm text-muted-foreground sm:inline">{session.user.name}</span> : null}
            <form action={logoutAction}>
            <Button asChild variant="outline" size="sm"><Link href="/">Exit Admin</Link></Button>
              <Button type="submit" variant="outline" size="sm">Keluar</Button>
            </form>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

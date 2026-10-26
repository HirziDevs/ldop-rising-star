import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string; error?: string; email?: string; password?: string }> }) {
  const params = await searchParams;
  if (params.email || params.password) redirect("/login");

  async function loginAction(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    try {
      await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
      if (error instanceof AuthError) redirect("/login?error=credentials");
      throw error;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Masuk ke akun</CardTitle>
        <CardDescription>Masukkan email dan kata sandi yang kamu daftarkan.</CardDescription>
      </CardHeader>
      <CardContent className="gap-5">
        {params.registered === "1" ? <p className="text-sm text-green-700">Akun kamu berhasil dibuat. Sekarang kamu bisa masuk.</p> : null}
        <form action={loginAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="Masukkan kata sandi" required />
          </div>
          {params.error === "credentials" ? <p role="alert" className="text-sm text-destructive">Email atau kata sandinya salah.</p> : null}
          <Button type="submit" className="w-full">Masuk</Button>
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun? <Link className="font-medium text-foreground underline-offset-4 hover:underline" href="/register">Daftar</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

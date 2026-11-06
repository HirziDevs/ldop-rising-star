import Link from "next/link";
import { PagePlaceholder } from "@/components/page-placeholder";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/guard";

export default async function EditProfilePage() {
  const user = await requireUser();

  return (
    <div className="space-y-4">
      <PagePlaceholder
        title="Ubah Profil"
        owner="Frontend"
        items={[
          "Sediakan formulir untuk mengubah nama dan foto profil.",
          "Tampilkan email pengguna sebagai informasi akun.",
          "Simpan perubahan profil ke akun yang sedang masuk.",
        ]}
      />
      <Button asChild variant="outline">
        <Link href={`/profile/${user.id}`}>Kembali ke profil</Link>
      </Button>
    </div>
  );
}

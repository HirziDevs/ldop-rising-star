import Link from "next/link";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/page-placeholder";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export default async function PublicUserProfilePage({ params }: Ctx) {
  const { id } = await params;
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  const session = await auth();

  return (
    <div className="space-y-4">
      <PagePlaceholder
        title="Profil Pengguna"
        owner="Frontend"
        items={[
          "Tampilkan nama dan foto profil yang dapat dilihat publik.",
          "Tampilkan rating dan komentar publik yang pernah dibuat.",
        ]}
      />
      {session?.user?.id === id ? (
        <Button asChild>
          <Link href="/profile/edit">Ubah profil</Link>
        </Button>
      ) : null}
    </div>
  );
}

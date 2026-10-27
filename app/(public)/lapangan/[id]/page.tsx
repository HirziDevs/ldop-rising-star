import { PagePlaceholder } from "@/components/page-placeholder";

export default async function LapanganDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PagePlaceholder
      title={`Detail Lapangan ${id}`}
      owner="Frontend"
      items={[
        "Tampilkan informasi lapangan, harga, foto, dan statusnya.",
        "Lapangan nonaktif tetap dapat dilihat, tetapi tidak dapat dipesan.",
      ]}
    />
  );
}

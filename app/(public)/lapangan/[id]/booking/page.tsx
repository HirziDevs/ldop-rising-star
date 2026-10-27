import { PagePlaceholder } from "@/components/page-placeholder";
import { requireUser } from "@/lib/guard";

export default async function LapanganBookingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser(["USER", "ADMIN"]);
  const { id } = await params;

  return (
    <PagePlaceholder
      title={`Booking Lapangan ${id}`}
      owner="Frontend"
      items={[
        "Sediakan form untuk memilih tanggal, jam mulai, dan jam selesai.",
        "Tampilkan ringkasan lapangan dan harga sebelum booking dikirim.",
        "Cek ketersediaan melalui GET /api/lapangan/[id]",
        "Sediakan aksi untuk mengirim booking setelah jadwal tersedia.",
        "Lapangan nonaktif hanya dapat dilihat dan tidak dapat dipesan.",
      ]}
    />
  );
}

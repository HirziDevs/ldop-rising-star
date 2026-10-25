import { PagePlaceholder } from "@/components/page-placeholder";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PagePlaceholder title={`Detail Booking ${id}`} owner="Frontend" items={["Tampilkan informasi booking.", "Tampilkan status dan rincian jadwal."]} />;
}

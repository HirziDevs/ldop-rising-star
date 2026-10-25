import Link from "next/link";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function AdminLapanganPage() {
  return <><PagePlaceholder title="Kelola Lapangan" owner="Frontend" items={["Tampilkan daftar lapangan.", "Sediakan aksi tambah dan ubah lapangan."]} /><Link href="/admin/lapangan/create">Tambah lapangan</Link></>;
}

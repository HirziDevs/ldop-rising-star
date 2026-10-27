export function isLapanganId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

export function parseLapanganNama(value: FormDataEntryValue | null) {
  const nama = String(value ?? "").trim();
  return nama.length >= 3 && nama.length <= 100 ? nama : null;
}

export function parseLapanganHarga(value: FormDataEntryValue | null) {
  const harga = Number(value);
  return Number.isInteger(harga) && harga > 0 ? harga : null;
}
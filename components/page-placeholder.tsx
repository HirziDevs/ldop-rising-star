import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  owner: string;
  items: string[];
};

// Penanda halaman yang belum dikerjakan. Ganti seluruh isi halaman saat implementasi.
export function PagePlaceholder({ title, owner, items }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          Belum dikerjakan · {owner}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}

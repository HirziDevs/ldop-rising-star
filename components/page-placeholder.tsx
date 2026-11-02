import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/container";

type Props = {
  title: string;
  owner: string;
  items: string[];
};

export function PagePlaceholder({ title, owner, items }: Props) {
  return (
    <Container className="py-10">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{title}</CardTitle>
            <Badge variant="warning">Belum dikerjakan</Badge>
          </div>
          <CardDescription>{owner}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}

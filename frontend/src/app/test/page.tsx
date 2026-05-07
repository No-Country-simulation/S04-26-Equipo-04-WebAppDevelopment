import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Test() {
  return (
    <div className="p-8 space-x-3">
      <Button>Primary</Button>
      <Button variant="ghost">Outlined</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>

      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="new">New</Badge>
    </div>
  )
}

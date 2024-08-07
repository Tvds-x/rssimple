import { Pin, PinOff } from "lucide-react";
import { Badge } from "./badge";

export default function PinBadge({ variant }: { variant: "pin" | "unpin" }) {
  return (
    <>
      {variant === "pin" && (
        <Badge className="flex items-center gap-1" variant="outline">
          <Pin className="w-2 h-2" />
          Pin
        </Badge>
      )}
      {variant === "unpin" && (
        <Badge className="flex items-center gap-1" variant="secondary">
          <PinOff className="w-2 h-2" />
          Unpin
        </Badge>
      )}
    </>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { ModeToggle } from "./mode-toggler";
export function UserInfo() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-l font-semibold tracking-tight truncate px-2">
          Login / Name
        </span>
        <ModeToggle />
      </div>
      <Separator />
    </>
  );
}

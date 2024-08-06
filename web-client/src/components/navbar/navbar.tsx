import { Nav } from "@/components/ui/nav";
import { Inbox, Pin } from "lucide-react";
import { Separator } from "../ui/separator";

export function NavBar() {
  return (
    <>
      <Nav
        links={[
          {
            title: "All",
            icon: Inbox,
            variant: "default",
            to: "/all",
          },
          {
            title: "Pinned",
            icon: Pin,
            variant: "ghost",
            to: "/pinned",
          },
        ]}
      />
      <Separator />
    </>
  );
}

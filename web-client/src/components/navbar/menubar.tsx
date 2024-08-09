import { Nav } from "@/components/ui/nav";
import { Inbox, Bookmark } from "lucide-react";
import { Separator } from "../ui/separator";

export function MenuBar() {
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
            icon: Bookmark,
            variant: "ghost",
            to: "/pinned",
          },
        ]}
      />
      <Separator />
    </>
  );
}

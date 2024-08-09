import { Separator } from "../ui/separator";
import { FeedBar } from "./feedbar";
import { FolderBar } from "./folderbar";
import { MenuBar } from "./menubar";

export function NavBar() {
  return (
    <>
      <Separator />
      <MenuBar />
      <FolderBar />
      <Separator />
      <FeedBar />
    </>
  );
}

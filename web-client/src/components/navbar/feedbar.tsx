import { feeds, folders } from "@/mok/feed";
import { ScrollArea } from "../ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

export function FeedBar() {
  return (
    <ScrollArea className="h-56">
      <div className="px-5 pt-2">
        {feeds.map((feed, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger>
              <div className="flex items-center justify-between" key={feed._id}>
                <div className="flex items-center gap-2 max-h-8 cursor-pointer">
                  <img src={feed.icon} className="h-4 rounded-full" />
                  <div className="text-sm font-medium line-clamp-1">
                    {feed.title}
                  </div>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Add to folder</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  {folders.map((folder) => (
                    <ContextMenuItem key={folder._id}>
                      {folder.title}
                    </ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuItem className="text-red-500">
                Delete feed
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </ScrollArea>
  );
}

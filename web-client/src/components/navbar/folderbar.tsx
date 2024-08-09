import { folders } from "@/mok/feed";
import { ScrollArea } from "../ui/scroll-area";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";

export function FolderBar() {
  return (
    <>
      <Accordion type="multiple" className="px-4">
        {folders.map((folder, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <div className="flex items-center justify-between ">
              <ContextMenu>
                <ContextMenuTrigger>
                  <span className="text-sm font-medium line-clamp-1">
                    {folder.title}
                  </span>
                </ContextMenuTrigger>
                <AccordionTrigger />
                <ContextMenuContent>
                  <ContextMenuItem className="text-red-500">
                    Delete folder
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
            <AccordionContent>
              <ScrollArea className="h-24">
                {folder.feeds.map((feed) => (
                  <div
                    className="flex items-center justify-between"
                    key={feed._id}
                  >
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <div className="flex items-center gap-2 max-h-8 cursor-pointer">
                          <img src={feed.icon} className="h-4 rounded-full" />
                          <div className="text-sm font-normal line-clamp-1">
                            {feed.title}
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>Remove from folder</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

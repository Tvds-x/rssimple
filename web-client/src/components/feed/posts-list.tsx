/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PinBadge from "../ui/pin-badge";

export default function PostsList({ items }: { items: any }) {
  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 p-2 pt-0">
          {items.map((item: any) => (
            <div
              key={item._id}
              onClick={() => console.log(item.title)}
              className="flex flex-col w-full p-3 items-start gap-2 rounded-lg border  text-left text-sm transition-all hover:bg-accent hover:cursor-pointer"
            >
              <div className="flex flex-col gap-1 w-full">
                <Tooltip>
                  <div className="flex items-center">
                    <TooltipTrigger className="flex items-center justify-between w-full">
                      <div
                        className={`max-w-[85%] text-left ${
                          !item.isRead && "font-semibold"
                        } line-clamp-1`}
                      >
                        {item.title}
                      </div>
                      <div className="text-muted-foreground">
                        {moment(item.isoDate).fromNow()}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-96">
                      {item.title}
                    </TooltipContent>
                  </div>
                </Tooltip>
                <div className="text-xs">{item.feed.title}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.contentSnippet}
              </div>
              {item.isFavorite ? (
                <PinBadge variant="unpin" />
              ) : (
                <PinBadge variant="pin" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}

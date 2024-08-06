/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PostsList({ items }: { items: any }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-2 pt-0">
        {items.map((item: any) => (
          <div
            onClick={() => console.log(item.title)}
            className="flex flex-col w-full p-3 items-start gap-2 rounded-lg border  text-left text-sm transition-all hover:bg-accent hover:cursor-pointer"
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`${
                      !item.isRead && "font-semibold"
                    } line-clamp-1`}
                  >
                    {item.title}
                  </div>
                  <div className="text-muted-foreground">{item.isoDate}</div>
                </div>
              </div>
              <div className="text-xs">{item.feed.title}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.contentSnippet}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

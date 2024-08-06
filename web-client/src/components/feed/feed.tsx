import PostsList from "./posts-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { FeedInput } from "./feed-input";
import { allPosts } from "../../mok/feed.ts";

export default function Feed() {
  return (
    <Tabs defaultValue="all" className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Title
        </h3>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <FeedInput />
      <div className=" overflow-hidden">
        <TabsContent value="all" className="h-full">
          <PostsList items={allPosts} />
        </TabsContent>
        <TabsContent value="unread" className="h-full">
          <PostsList items={allPosts.filter((item) => !item.isRead)} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

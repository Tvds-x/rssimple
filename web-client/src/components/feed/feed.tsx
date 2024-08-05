import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Feed() {
  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between px-4 py-2">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Title
          </h3>
          <TabsList>
            <TabsTrigger value="all"> All Posts</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </div>
        <Separator />

        {/* <TabsContent value="all">All</TabsContent>
        <TabsContent value="unread">Unread</TabsContent> */}
      </Tabs>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
    </>
  );
}

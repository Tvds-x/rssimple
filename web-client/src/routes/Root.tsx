import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Feed from "@/components/feed/feed";
import { UserInfo } from "@/components/user-info/user-info";

export default function Root() {
  const isAuth = useUserStore((state) => state.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      // navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} minSize={15}>
          <UserInfo />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45} minSize={40}>
          <Feed />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40} minSize={30}>
          <Button variant="link">
            <Link to="/login"> Login </Link>
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

import { createBrowserRouter } from "react-router-dom";
import Root from "./Root.tsx";
import Login from "./Login.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

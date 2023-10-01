import { createBrowserRouter } from "react-router-dom";
import Stream from "../pages/stream";
import StreamUid from "../pages/stream/[uid]";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Stream,
  },
  {
    path: "/stream",
    Component: Stream,
  },
  {
    path: "/stream/:uid",
    Component: StreamUid,
  },
]);

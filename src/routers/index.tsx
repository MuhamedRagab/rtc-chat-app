import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import Providers from "../utils/providers";

export default function Router() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

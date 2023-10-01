import React from "react";
import AgoraProvider from "./AgoraProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AgoraProvider>{children}</AgoraProvider>;
}

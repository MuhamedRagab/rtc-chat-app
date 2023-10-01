import { useContext } from "react";
import { AgoraContext } from "../providers/AgoraProvider";

export const useAgoraContext = () => useContext(AgoraContext);

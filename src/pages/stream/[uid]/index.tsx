import { useAgoraContext } from "../../../utils/contexts";
import DisplayStream from "./components/DisplayStream";

export default function StreamUid() {
  const { setRemoteUsers, localTracks, remoteUsers } = useAgoraContext();

  return (
    <div>
      <DisplayStream {...{ setRemoteUsers, remoteUsers, localTracks }} />
    </div>
  );
}

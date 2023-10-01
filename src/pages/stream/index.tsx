import { useAgoraContext } from "../../utils/contexts";
import JoinStream from "./components/JoinStream";

export default function Stream() {
  const { setLocalTracks } = useAgoraContext();

  return (
    <div>
      <JoinStream {...{ setLocalTracks }} />
    </div>
  );
}

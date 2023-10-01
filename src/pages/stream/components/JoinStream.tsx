import AgoraRTC from "agora-rtc-sdk-ng";
import { LocalTracks, client } from "../../../utils/providers/AgoraProvider";
import { useNavigate } from "react-router-dom";

interface JoinStreamProps {
  setLocalTracks: React.Dispatch<React.SetStateAction<LocalTracks>>;
}

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const CHANNEL = import.meta.env.VITE_AGORA_CHANNEL;
const TOKEN = import.meta.env.VITE_AGORA_TOKEN;

export default function JoinStream({ setLocalTracks }: JoinStreamProps) {
  const navigate = useNavigate();

  const joinAndDisplayLocalStream = async () => {
    const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
    const localTracks: LocalTracks =
      await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(localTracks);
    localTracks[1].setMuted(true);
    await client.publish(localTracks);

    navigate(`/stream/${uid}`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="button-container">
        <button className="btn" onClick={joinAndDisplayLocalStream}>
          Join Stream
        </button>
      </div>
    </div>
  );
}

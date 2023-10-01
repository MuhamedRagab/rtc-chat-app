import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import {
  IRemoteUsers,
  LocalTracks,
  client,
} from "../../../../utils/providers/AgoraProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface DisplayStreamProps {
  localTracks: LocalTracks;
  remoteUsers: IRemoteUsers;
  setRemoteUsers: React.Dispatch<React.SetStateAction<IRemoteUsers>>;
}

interface ITracksMuted {
  audio: boolean;
  video: boolean;
}

type MediaType = "video" | "audio" | "datachannel";

export default function DisplayStream({
  localTracks,
  remoteUsers,
  setRemoteUsers,
}: DisplayStreamProps) {
  const [tracksMuted, setTracksMuted] = useState<ITracksMuted>({
    audio: localTracks[0]?.muted ?? false,
    video: localTracks[1]?.muted ?? false,
  });
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();

  const leaveAndRemoveLocalStream = async () => {
    localTracks.forEach((track) => {
      track.stop();
      track.close();
    });
    await client.leave();

    navigate("/stream");
  };

  const toggleMic = async () => {
    const [audioTrack] = localTracks;
    setTracksMuted((prev) => ({ ...prev, audio: !prev.audio }));
    await audioTrack?.setMuted(!audioTrack.muted);
  };

  const toggleCamera = async () => {
    const [, vedioTrack] = localTracks;
    setTracksMuted((prev) => ({ ...prev, video: !vedioTrack?.muted }));
    await vedioTrack?.setMuted(!vedioTrack.muted);
  };

  const handleUserJoined = async (
    user: IAgoraRTCRemoteUser,
    mediaType: MediaType
  ) => {
    setRemoteUsers((prevUsers) => ({
      ...prevUsers,
      [user.uid]: user,
    }));

    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      user.videoTrack?.play(`user-${user.uid}`);
    } else if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  };

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    setRemoteUsers((prevUsers) => {
      delete prevUsers[user.uid];
      return prevUsers;
    });
  };

  const init = () => {
    const [, videoTrack] = localTracks;
    client.remoteUsers.forEach((user) => {
      handleUserJoined(user, "video");
    });
    videoTrack?.play(`user-${uid}`);
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    if (uid) init();

    return () => {
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  useEffect(() => {
    if (localTracks.length === 0) navigate("/stream");
  }, [localTracks, navigate, uid]);

  return (
    <div>
      <section className="flex flex-wrap  gap-4 p-4 h-[90vh] container overflow-y-auto">
        <div
          id={`user-${uid}`}
          className="video-container w-[480px] h-[320px] rounded-md"
        />
        {client.remoteUsers.length > 0 &&
          Object.keys(remoteUsers).map((key) => (
            <div
              key={key}
              id={`user-${key}`}
              className="video-container w-[480px] h-[320px] rounded-md"
            />
          ))}
      </section>

      <div className="flex items-center justify-center p-2 gap-4">
        <button className="btn btn-error" onClick={leaveAndRemoveLocalStream}>
          Leave
        </button>
        <button
          className={`btn ${tracksMuted.audio ? "btn-error" : "btn-success"}`}
          onClick={toggleMic}
        >
          Mute
        </button>
        <button
          className={`btn ${tracksMuted.video ? "btn-error" : "btn-success"}`}
          onClick={toggleCamera}
        >
          Video
        </button>
      </div>
    </div>
  );
}

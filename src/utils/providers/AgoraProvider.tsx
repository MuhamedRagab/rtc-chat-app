import { createContext, useState } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng";

// eslint-disable-next-line react-refresh/only-export-components
export const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

client.enableAudioVolumeIndicator();
client.enableDualStream();

export type LocalTracks =
  | [audioTrack: IMicrophoneAudioTrack, videoTrack: ICameraVideoTrack]
  | [];

export interface IRemoteUsers {
  [key: UID]: IAgoraRTCRemoteUser;
}

interface AgoraContextProps {
  localTracks: LocalTracks;
  setLocalTracks: React.Dispatch<React.SetStateAction<LocalTracks>>;
  remoteUsers: IRemoteUsers;
  setRemoteUsers: React.Dispatch<React.SetStateAction<IRemoteUsers>>;
}

export const AgoraContext = createContext<AgoraContextProps>(
  {} as AgoraContextProps
);

export default function AgoraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [localTracks, setLocalTracks] = useState<LocalTracks>([]);
  const [remoteUsers, setRemoteUsers] = useState<IRemoteUsers>(
    {} as IRemoteUsers
  );

  return (
    <AgoraContext.Provider
      value={{
        localTracks,
        setLocalTracks,
        remoteUsers,
        setRemoteUsers,
      }}
    >
      {children}
    </AgoraContext.Provider>
  );
}

import { RtcRole, RtcTokenBuilder } from "agora-token";

export const generateRtcToken = () => {
  const appId = import.meta.env.VITE_AGORA_APP_ID || "";
  const appCertificate = import.meta.env.VITE_AGORA_APP_CERTIFICATE || "";
  const channelName = import.meta.env.VITE_AGORA_CHANNEL || "";
  const uid: number | string = Math.floor(Math.random() * 1000000000) || 0;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds: number = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs,
    0
  );

  console.log({ tokenA });

  return tokenA;
};

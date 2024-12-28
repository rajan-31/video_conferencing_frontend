import { formatChatMessageLinks, LiveKitRoom, LocalUserChoices, VideoConference } from "@livekit/components-react";
import { ConnectionDetails } from "../lib/types";
import { Room, RoomConnectOptions, RoomOptions, VideoCodec, VideoPresets } from "livekit-client";
import { useNavigate } from "react-router";
import React from "react";
import RecordingIndicator from "./RecordingIndicator";
import { SettingsMenu } from "./SettingsMenu";

const VideoConferenceComponent = (props: {
    userChoices: LocalUserChoices;
    connectionDetails: ConnectionDetails;
    options: {
        hq: boolean;
        codec: VideoCodec;
    }
}) => {

    const connectOptions = React.useMemo((): RoomConnectOptions => {
        return {
            autoSubscribe: true,
        };
    }, []);

    const roomOptions = React.useMemo((): RoomOptions => {
        let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';

        return {
          videoCaptureDefaults: {
            deviceId: props.userChoices.videoDeviceId ?? undefined,
            resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
          },
          publishDefaults: {
            dtx: false,
            videoSimulcastLayers: props.options.hq
              ? [VideoPresets.h1080, VideoPresets.h720]
              : [VideoPresets.h540, VideoPresets.h216],
            videoCodec,
          },
          audioCaptureDefaults: {
            deviceId: props.userChoices.audioDeviceId ?? undefined,
          },
          adaptiveStream: { pixelDensity: 'screen' },
          dynacast: true
        };
      }, [props.userChoices, props.options.hq, props.options.codec]);
    
      const room = React.useMemo(() => new Room(roomOptions), []);

    // ======================================================
    const navigate = useNavigate();
    const handleOnLeave = React.useCallback(() => navigate("/"), [navigate]);
    const handleError = React.useCallback((error: Error) => {
        console.error(error);
        alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
    }, []);
    const handleEncryptionError = React.useCallback((error: Error) => {
        console.error(error);
        alert(
            `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
        );
    }, []);
    return (
        <>          
            <LiveKitRoom 
                connect={true}
                token={props.connectionDetails.participantToken}
                serverUrl={props.connectionDetails.serverUrl}

                video={props.userChoices.videoEnabled}
                audio={props.userChoices.audioEnabled}
                onDisconnected={handleOnLeave}
                onEncryptionError={handleEncryptionError}
                onError={handleError}

                connectOptions={connectOptions}
                room={room}
            >
                <VideoConference
                    chatMessageFormatter={formatChatMessageLinks}
                    SettingsComponent={SettingsMenu}
                />
                {/* <DebugMode /> */}
                <RecordingIndicator />
            </LiveKitRoom>
        </>
    );
}

export default VideoConferenceComponent;
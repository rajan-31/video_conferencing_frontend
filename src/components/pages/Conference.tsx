import { LocalUserChoices, PreJoin } from "@livekit/components-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ConnectionDetails } from "../../lib/types";
import VideoConferenceComponent from "../VideoConferenceComponent";

const Conference = () => {
    const {conferenceId} = useParams()
    const [tokenJoinRoom, setTokenJoinRoom] = useState("");

	const getTokens = async () => {
		const res2 = await axios.get(`/conference/media_server/jwt/join_room?name=${connectionDetails?.participantName}&roomId=${conferenceId}`);
		setTokenJoinRoom(res2.data);

		console.log(tokenJoinRoom);
	}

	// ======================================================

	const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(undefined);
	const preJoinDefaults = React.useMemo(() => {
		return {
			username: '',
			videoEnabled: true,
			audioEnabled: true,
		};
	}, []);
	const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(undefined);

	
	const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
		if(!conferenceId) return console.error("conferenceId is undefined");

		setPreJoinChoices(values);
		// const url = new URL(`/conference/media_server/jwt/join_room`, window.location.origin);
		// url.searchParams.append('roomName', conferenceId);
		// url.searchParams.append('participantName', values.username);

		// const connectionDetailsResp = await fetch(url.toString());
		// const connectionDetailsData = await connectionDetailsResp.json();

		// setConnectionDetails(connectionDetailsData);

		const res2 = await axios.get(`/conference/media_server/jwt/join_room?name=${values.username}&roomId=${conferenceId}`);

		setConnectionDetails({
			serverUrl: import.meta.env.VITE_LIVEKIT_API_URL,
			roomName: conferenceId,
			participantName: values.username,
			participantToken: res2.data
		})
	}, []);

	const handlePreJoinError = React.useCallback((error: Error) => {
		console.error(error);
	}, []);

	// ======================================================

    return (
        <div className="vh-100 d-flex">
			<div data-lk-theme="default" className="flex-grow-1">
				{connectionDetails === undefined || preJoinChoices === undefined ? (
					<PreJoin 
						defaults={preJoinDefaults}
						onSubmit={handlePreJoinSubmit}
						onError={handlePreJoinError}					
					/>
				) : (
					<VideoConferenceComponent
						connectionDetails={connectionDetails}
						userChoices={preJoinChoices}
						options={{ hq: true, codec: 'vp9' }}
					/>
				)}
			</div>
		</div>
    )
}

export default Conference;
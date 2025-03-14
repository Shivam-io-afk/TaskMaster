import React, { useEffect, useState } from "react";
import { StreamVideoClient, StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css"; // Import Stream.io styles

const API_KEY = "YOUR_STREAM_API_KEY";
const USER_ID = "john_doe"; // Replace with actual user ID
const USER_TOKEN = "YOUR_USER_ACCESS_TOKEN"; // Generate from backend

const StreamMeeting = () => {
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);

    useEffect(() => {
        const streamClient = new StreamVideoClient({ apiKey: API_KEY });

        streamClient.connectUser({ id: USER_ID, name: "John Doe" }, USER_TOKEN)
            .then(() => {
                setClient(streamClient);
                const newCall = streamClient.call("default", "meeting-room");
                newCall.join({ create: true }).then(() => setCall(newCall));
            });

        return () => streamClient.disconnectUser();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Stream.io Video Meeting</h2>
            {call ? (
                <StreamCall call={call}>
                    <StreamVideo />
                </StreamCall>
            ) : (
                <p>Loading Meeting...</p>
            )}
        </div>
    );
};

export default StreamMeeting;

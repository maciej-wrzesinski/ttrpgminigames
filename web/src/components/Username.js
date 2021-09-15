import React, { useState } from "react";

function Username({ socket, setStage }) {
    const [username, setUsername] = useState("");

    const applyUsername = () => {
        if (username.length <= 2) {
            return;
        }
        
        socket.emit("join_room", username);
        setStage("LOBBY");
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username..."
                onChange={event => {
                    setUsername(event.target.value);
                }}
            />
            <button onClick={applyUsername}>Apply username</button>
        </div>
    );
}

export default Username;
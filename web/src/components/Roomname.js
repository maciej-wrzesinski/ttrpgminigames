import React, { useState, useEffect } from "react";

function Roomname({ socket, setStage }) {
    const uri = window.location.href.split('/')[3];
    const [roomname, setRoomname] = useState(uri);

    const joinRoom = () => {
        if (roomname.length <= 2) {
            return;
        }
        if (roomname.match(/[A-Za-z0-9\-_]/g) === false) {
            return;
        }

        socket.emit("join_room", roomname);
        setStage("USERNAME");
        window.history.pushState("", "", '/' + roomname);
    };

    useEffect(() => {
        joinRoom();
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Roomname..."
                onChange={event => {
                    setRoomname(event.target.value);
                }}
            />
            <button onClick={joinRoom}>Join A Room</button>
        </div>
    );
}

export default Roomname;
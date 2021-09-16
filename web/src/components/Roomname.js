import React, { useState, useEffect } from "react";
import { ArwesThemeProvider, StylesBaseline, FrameHexagon, Button, Text } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";

const animatorGeneral = { duration: { enter: 300, exit: 300 } };

function Roomname({ socket, setStage }) {
    const uri = window.location.href.split('/')[3];
    const [roomname, setRoomname] = useState(uri);
    const [activate, setActivate] = useState(false);

    const ableToJoinRoom = () => {
        if (roomname.length <= 2) {
            return false;
        }
        if (roomname.match(/[A-Za-z0-9\-_]/g) === false) {
            return false;
        }

        return true;
    };

    const joinRoom = () => {
        if (ableToJoinRoom(roomname) === false) {
            return;
        }

        socket.emit("join_room", roomname);
        setStage("USERNAME");
        window.history.pushState("", "", '/' + roomname);
    };

    useEffect(() => {
        joinRoom(socket, roomname, setStage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ArwesThemeProvider>
            <StylesBaseline />
            <AnimatorGeneralProvider animator={animatorGeneral}>
                <FrameHexagon>
                    <div className="window-popup">
                        <div>
                            <Text>Please enter roomname.</Text>
                        </div>
                        <div className="window-input">
                            <input type="text" placeholder="[ROOMNAME]" onChange={event => { setRoomname(event.target.value); setActivate(ableToJoinRoom()); }} />
                            <Button disabled={!activate} onClick={joinRoom}><Text>Enter</Text></Button>
                        </div>
                    </div>
                </FrameHexagon>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
}

export default Roomname;
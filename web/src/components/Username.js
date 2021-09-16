import React, { useState } from "react";
import { ArwesThemeProvider, StylesBaseline, FrameHexagon, Button, Text } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";

const animatorGeneral = { duration: { enter: 300, exit: 300 } };

function Username({ socket, setStage }) {
    const [username, setUsername] = useState("");
    const [activate, setActivate] = useState(false);

    const ableToApply = () => {
        if (username.length <= 2) {
            return false;
        }
        
        return true;
    };

    const applyUsername = () => {
        if (ableToApply === false) {
            return;
        }
        
        socket.emit("join_room", username);
        setStage("LOBBY");
    };

    return (
        <ArwesThemeProvider>
            <StylesBaseline />
            <AnimatorGeneralProvider animator={animatorGeneral}>
                <FrameHexagon>
                    <div className="window-popup">
                        <div>
                            <Text>Please enter username.</Text>
                        </div>
                        <div className="window-input">
                            <input type="text" placeholder="[USERNAME]" onChange={event => { setUsername(event.target.value); setActivate(ableToApply()); }} />
                            <Button disabled={!activate} onClick={applyUsername}><Text>Apply</Text></Button>
                        </div>
                    </div>
                </FrameHexagon>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
}

export default Username;
import { useState } from "react";
import { createTheme } from "@arwes/design";
import * as emotion from "@emotion/react";

import io from "socket.io-client";
import Roomname from "./components/Roomname";
import Username from "./components/Username";
import Lobby from "./components/Lobby";
import "./App.css";

const PORT = process.env.PORT || 4000;
const socket = io.connect("http://localhost:" + PORT);

function App() {
    const [showRoomname, setStage] = useState("ROOMNAME");
    
    const theme = createTheme();
    
    return (
        <emotion.ThemeProvider theme={theme}>
            <emotion.Global styles={{
                'html, body': {
                    fontFamily: 'monospace',
                    backgroundColor: theme.palette.neutral.elevate(0)
                }
            }} />
            <div className="App">
                {showRoomname === "ROOMNAME" && <Roomname socket={socket} setStage={setStage} />}
                {showRoomname === "USERNAME" && <Username socket={socket} setStage={setStage} />}
                {showRoomname === "LOBBY" && <Lobby socket={socket} setStage={setStage} />} 
            </div>
        </emotion.ThemeProvider>
    );
}

export default App;
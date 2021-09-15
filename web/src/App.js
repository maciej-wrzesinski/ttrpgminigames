import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Roomname from "./components/Roomname";
import Username from "./components/Username";
import Lobby from "./components/Lobby";

const PORT = process.env.PORT || 4000;
const socket = io.connect("http://localhost:" + PORT);

function App() {
    const [showRoomname, setStage] = useState("ROOMNAME");
    
    return (
        <div className="App">
            {showRoomname === "ROOMNAME" && <Roomname socket={socket} setStage={setStage} />}
            {showRoomname === "USERNAME" && <Username socket={socket} setStage={setStage} />}
            {showRoomname === "LOBBY" && <Lobby socket={socket} setStage={setStage} />} 
        </div>
    );
}

export default App;
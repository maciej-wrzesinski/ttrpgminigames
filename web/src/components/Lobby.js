import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import Userlist from "../components/Userlist";
//import Chat from "../components/Chat";
//<Chat socket={socket} username={socket} room={socket} /> 
import Game from "../components/Game";

const animatorGeneral = { duration: { enter: 300, exit: 300 } };

function Lobby({ socket }) {
    
    return (
        <ArwesThemeProvider>
            <StylesBaseline />
            <AnimatorGeneralProvider animator={animatorGeneral}>
                <div className="window-overview">
                    <Userlist socket={socket} />
                    <Userlist socket={socket} />
                    <Game socket={socket} />
                </div>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
}

export default Lobby;
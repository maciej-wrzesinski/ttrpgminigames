import { ArwesThemeProvider, StylesBaseline, FrameHexagon } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";

const animatorGeneral = { duration: { enter: 300, exit: 300 } };

function Game({ socket }) {
    
    return (
        <ArwesThemeProvider>
            <StylesBaseline />
            <AnimatorGeneralProvider animator={animatorGeneral}>
                <FrameHexagon>
                    <div className="window-game">
                        here is the game
                    </div>
                </FrameHexagon>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
}

export default Game;
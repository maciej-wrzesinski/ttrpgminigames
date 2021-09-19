import { ArwesThemeProvider, FrameHexagon } from "@arwes/core";

function Game({ socket }) {
    return (
        <ArwesThemeProvider>
            <FrameHexagon inverted>
                <div className="window-game">
                    GAME
                </div>
            </FrameHexagon>
        </ArwesThemeProvider>
    );
}

export default Game;
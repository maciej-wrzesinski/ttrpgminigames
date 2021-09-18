import React, { useEffect, useState } from "react";
import { ArwesThemeProvider, StylesBaseline, FrameHexagon } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";

const animatorGeneral = { duration: { enter: 300, exit: 300 } };

function Userlist({ socket }) {
    const [userlist, setUserList] = useState([]);
    
    useEffect(() => {
        socket.on("user_list", (data) => {
            setUserList(data);
        });
    }, [socket]);

    return (
        <ArwesThemeProvider>
            <StylesBaseline />
            <AnimatorGeneralProvider animator={animatorGeneral}>
                <FrameHexagon>
                    <div className="window-userlist">
                        {userlist.map(user => (
                            <div key={user.userID}>{user.username}</div>
                        ))}
                    </div>
                </FrameHexagon>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
}

export default Userlist;
import React, { useEffect, useState } from "react";
import { ArwesThemeProvider, FrameHexagon, FrameBox } from "@arwes/core";

function Userlist({ socket }) {
    const [userlist, setUserList] = useState([]);
    
    useEffect(() => {
        socket.on("user_list", (data) => {
            setUserList(data);
        });
    }, [socket]);

    return (
        <ArwesThemeProvider>
            <FrameHexagon animator={{ root: true }}>
                <div className="window-userlist">
                    <p>PLAYER LIST</p>
                        <FrameBox linesWidths={[1, 0, 1, 0]}>
                            <div className="window-userlist-list">
                                {userlist.map(user => (
                                    <div key={user.userID}><b>{user.username}</b></div>
                                ))}
                            </div>
                        </FrameBox>
                    </div>
            </FrameHexagon>
        </ArwesThemeProvider>
    );
}

export default Userlist;
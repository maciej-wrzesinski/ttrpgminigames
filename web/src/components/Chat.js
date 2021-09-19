import React, { useEffect, useState } from "react";
import { ArwesThemeProvider, FrameHexagon, FrameBox, Button, Text, FrameLines } from "@arwes/core";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        socket.emit("send_message", currentMessage);
        setCurrentMessage("");
    };

    useEffect(() => { 
        socket.on("receive_message", data => setMessageList(list => [...list, data]));
     }, [socket]);

    return (
        <ArwesThemeProvider>
            <FrameHexagon>
                <div className="window-chat">
                    <div>
                        <p>LIVE CHAT</p>
                    </div>
                    <div className="window-chat-body">
                        <FrameBox linesWidths={[1, 0, 1, 0]}>
                            <ScrollToBottom className="window-chat-messages">
                                {messageList.map(message => {
                                    return (
                                        <div key={message.timestamp} className={socket.id === message.id ? "window-chat-message-you" : "window-chat-message-somebody"}>
                                            <FrameLines animator={{ root: true }}>
                                                <div className="window-chat-message">
                                                    <div className="window-chat-message-author"><b>{message.username}</b></div>
                                                    <div className="window-chat-message-content">{message.content}</div>
                                                </div>
                                            </FrameLines>
                                        </div>
                                    );
                                })}
                            </ScrollToBottom>
                        </FrameBox>
                        <div className="window-input">
                            <input type="text" value={currentMessage} placeholder="Hey..." onChange={event => setCurrentMessage(event.target.value)} onKeyPress={event => event.key === "Enter" && sendMessage()} />
                            <Button onClick={sendMessage}><Text>&#9658;</Text></Button>
                        </div>
                    </div>
                </div>
            </FrameHexagon>
        </ArwesThemeProvider>
    );
}

export default Chat;
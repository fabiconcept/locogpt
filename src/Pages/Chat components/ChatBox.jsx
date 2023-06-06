import React, { useContext, useEffect, useRef } from 'react';
import Bubble from './Bubble';
import { chatPageContaxt } from '../ChatPage';
import { useState } from 'react';

const ChatBox = () => {
    const { chats, assistantThinking, I_Am_Typing } = useContext(chatPageContaxt);
    const msg = new SpeechSynthesisUtterance();
    const divRef = useRef(null);

    const speechHandler = (msg, value) => {
        window.speechSynthesis.cancel();
        msg.text = value;
        window.speechSynthesis.speak(msg);
    }

    const calculateTimeDifference = (timestamp) => {
        const currentTime = new Date().getTime();
        const givenTime = new Date(timestamp).getTime();
        const differenceInSeconds = Math.floor((currentTime - givenTime) / 1000);
        return differenceInSeconds;
    };

    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;

        if (chats.length > 0) {
            const lastMessage = chats[chats.length - 1];
            const lastMessageValue = lastMessage.value;
            const lastMessageType = lastMessage.type;
            if (lastMessageType === 0 && calculateTimeDifference(lastMessage.timestamp) < 5) {
                speechHandler(msg, lastMessageValue);
            }else{
                window.speechSynthesis.cancel();
            }
        }
    }, [chats]);

    return (
        <div className="chatSection" ref={divRef}>
            {chats.map(i => (
                <Bubble text={i.value} timestamp={i.timestamp} type={i.type} key={i.key} />
            ))}
            {assistantThinking && <div className="pending bubble">
                <div className="ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}
            {I_Am_Typing && <div className="pending bubble from">
                <div className="ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}

        </div>
    )
}

export default ChatBox;
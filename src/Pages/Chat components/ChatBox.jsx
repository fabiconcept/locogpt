import React, { useContext, useEffect, useRef } from 'react'
import Bubble from './Bubble'
import { chatPageContaxt } from '../ChatPage'

const ChatBox = () => {
    const { chats, assistantThinking, I_Am_Typing } = useContext(chatPageContaxt);

    const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [chats]);

    return (
        <div className="chatSection" ref={divRef}>
            {chats.map(i=>(
                <Bubble text={i.value} timestamp={i.timestamp} type={i.type} key={i.key}/>
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

export default ChatBox
            // <div className="timeMaker">
            //     <span>Today</span>
            // </div>
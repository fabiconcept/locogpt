import React, { useContext, useEffect, useState } from 'react';
import { chatPageContaxt } from '../ChatPage';

const Footer = () => {
    const { sendMessage, startListening, stopListening, setI_Am_Typing } = useContext(chatPageContaxt);
    const [text, setText] = useState("");

    const handleSend = () =>{
        const textValue = text;
        if (String(textValue).length > 0) {
            sendMessage(textValue);
            setText("");
        }
    }

    useEffect(()=>{
        setI_Am_Typing((String(text).length > 0));
    }, [text]);

    return (
        <div className="chatFooter">
            <div className="inp">
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e)=>setText(e.target.value)} 
                    placeholder='Start a conversation...' 
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                />
                <div className="send" onClick={handleSend}>
                    <img src="https://locogpt.sirv.com/Images/icons/paper-plane.svg" alt="" />
                </div>
            </div>
            <div 
                className="ico" 
                onTouchStart={()=>startListening()}
                onMouseDown={()=>startListening()}
                onTouchEnd={()=>stopListening()}
                onMouseUp={()=>stopListening()}
            >
                <img className='off' src="https://locogpt.sirv.com/Images/icons/microphone-alt.svg" alt="" />
                <img className='on' src="https://locogpt.sirv.com/Images/icons/solid/microphone-alt.svg" alt="" />
            </div>
        </div>
    )
}

export default Footer;
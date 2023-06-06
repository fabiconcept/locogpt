import React, { createContext, useEffect, useState } from 'react';
import ChatBox from './Chat components/ChatBox';
import Footer from './Chat components/Footer';
import Top from './Chat components/Top';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { fireDatabase } from '../Utilities/firebase';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';


export const chatPageContaxt = createContext();
const ChatPage = () => {
    const [assistantResponse, setAssistantResponse] = useState("");
    const [assistantThinking, setAssistantThinking] = useState(false);
    const [I_Am_Typing, setI_Am_Typing] = useState(false);
    const [chats, setChats] = useState([]);
    const {
        transcript,
        listening,
        resetTranscript,
        isMicrophoneAvailable,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const createNewBubble = (msg, type) => {
        const messageText = msg;
        const newBubble = {
            value: messageText,
            type,
            key: Math.random().toString(27).slice(2),
            timestamp: new Date().getTime(),
        }

        setChats([...chats, newBubble]);
    }

    const sendMessage = async (message) => {
        createNewBubble(message, 1);
        try {
            setAssistantThinking(true);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    messages: [{ role: 'system', content: "You are a useful assistant, that enjoys to help, your name is LocoGPT, the name of your developer is Samuel Promise, Samuel Promise is a student of Computer Science Final year in Imo State University Nigeria, he built this project a his Final Year Project, His Final Year Peoject Topic is Design and Implementation of an AI Assistant. His supervisor's name is Mr. I.A Amaefule he is a lecture in the department." }, { role: 'user', content: message }],
                    model: "gpt-3.5-turbo"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
                    },
                }
            );

            const newMessage = response.data.choices[0].message.content;
            setAssistantResponse(newMessage);
            setAssistantThinking(false);
        } catch (error) {
            setAssistantThinking(false);
            const errTitle = error.message;
            const errStatus = error.request.status;
            const errMessage = error.request.responseText;
            toast.error(`${errTitle}`);
            console.error('Error:', error);
        }
    };

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({
            continuous: true
        });
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    const closeTranscriptHanger = () =>{
        const transcriptDiv = document.getElementById("transcript");
        transcriptDiv.classList.remove("speaking");
    }

    const acceptTranscript = () =>{
        sendMessage(transcript);
        closeTranscriptHanger();
        resetTranscript();
    }

    const getPreviousChats = () => {
        const chatsRef = collection(fireDatabase, "chatsHistory");
        
        onSnapshot(chatsRef, (snapshots) =>{
            const retrievedSnaps = snapshots.docs;
            const retrievedMessages = [];

            if (retrievedSnaps !== null) {
                retrievedSnaps.forEach((snap)=>{
                    retrievedMessages.push(snap.data());
                });

            }
            if (retrievedMessages.length > 0) {
                setChats(retrievedMessages.sort((a, b) => a.timestamp - b.timestamp));
            }else{
                setChats([
                    ...chats, 
                    { value: "Hello there! I'm your friendly AI Assistant LocoGPT, ready to help you. Let's get started! ✨", type: 0, key: "75dp8aiicdji", timestamp: new Date().getTime()}
                ]);
            }
        });
    }

    const updateChats = async () => {
        const chatsRef = collection(fireDatabase, "chatsHistory");
        const chatsMessages = [...chats];

        chatsMessages.forEach(async (chat)=>{
            try {
                await setDoc(doc(chatsRef, `${chat.key}`), chat);
            } catch (error) {
                console.log(error);
            }
        });
    }

    useEffect(() => {
        if (String(assistantResponse).length > 0) {
            createNewBubble(assistantResponse, 0);
        }
    }, [assistantResponse]);

    useEffect(()=>{
        updateChats();
    }, [chats]);

    useEffect(()=>{
        getPreviousChats();
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    if (!isMicrophoneAvailable) {
        return <span>No Microphone detected!.</span>;
    }

    return (
        <chatPageContaxt.Provider value={{ chats, setChats, sendMessage, transcript, listening, startListening, stopListening, assistantThinking, setAssistantThinking, I_Am_Typing, setI_Am_Typing }}>

            <div className="chatPage">
                <Toaster
                    toastOptions={{
                        style: {
                            background: '#101d31',
                            color: '#fff',
                        },
                    }}
                />
                <Top />
                <div id='transcript' className={`transcript-cover ${String(transcript).length > 0 ? "speaking": ""} ${listening > 0 ? "speaking": ""}`}>
                    <div className="transcript">
                        <div className="case">
                            <div className="p">
                                {String(transcript).length > 0 ? transcript : "Speak now, LocoGPT is Listening..."}
                            </div>
                            {!listening && String(transcript).length > 0 && <div className="bts-row">
                                <div className="b" onClick={closeTranscriptHanger}>
                                    <img src="https://locogpt.sirv.com/Images/icons/times.svg" alt="" />
                                </div>
                                <div className="b" onClick={acceptTranscript}>
                                    <img src="https://locogpt.sirv.com/Images/icons/check.svg" alt="" />
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <ChatBox />
                <Footer />
            </div>
        </chatPageContaxt.Provider>
    )
}

export default ChatPage;
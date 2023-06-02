import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [conversation, setConversation] = useState([]);

    const sendMessage = async (message) => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    messages: [{ role: 'system', content: 'You are a hostile fowl mouthed assistant that is tired of their job.' }, { role: 'user', content: message }],
                    model: "gpt-3.5-turbo"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
                    },
                }
            );

            const newMessage = { role: 'assistant', content: response.data.choices[0].message.content };
            setConversation([...conversation, newMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className='container p-4 bg-white w-100'>
            {conversation.map((message, index) => (
                <div key={index} className='my-4'>
                    <strong>{message.role}: </strong>
                    {message.content}
                </div>
            ))}
            <input
                type="text"
                className='form-control'
                placeholder="Type your message..."
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        sendMessage(event.target.value);
                        event.target.value = '';
                    }
                }}
            />
        </div>
    );
};

export default Chat;

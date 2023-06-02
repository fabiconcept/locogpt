import React, { createContext, useState } from 'react';
import SPlashScreen from './Pages/SPlashScreen';
import ChatPage from './Pages/ChatPage';

export const appContext = createContext();
const App = () => {
    const [splashState, setSplashState] = useState("");
    return (
        <appContext.Provider value={{splashState, setSplashState}}>
            <div className="app">
                <SPlashScreen />
                <ChatPage />
            </div>
        </appContext.Provider>
    );
}

export default App;
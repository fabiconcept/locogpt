import React, { createContext, useState } from 'react';
import SPlashScreen from './Pages/SPlashScreen';
import ChatPage from './Pages/ChatPage';
import LoadingPage from './Pages/LoadingPage';

export const appContext = createContext();
const App = () => {
    const [splashState, setSplashState] = useState("");
    return (
        <appContext.Provider value={{splashState, setSplashState}}>
            <div className="app">
                <LoadingPage />
                <SPlashScreen />
                <ChatPage />
            </div>
        </appContext.Provider>
    );
}

export default App;
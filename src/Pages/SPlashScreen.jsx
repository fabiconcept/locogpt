import React, { useContext, useEffect, useState } from 'react'
import Screen from './splash Screen pages/Screen';
import { appContext } from '../App';

const SPlashScreen = () => {
    const [screen_x, setScreen] = useState(0);
    const { splashState, setSplashState } = useContext(appContext);

    const navController = (element) => {
        if (typeof (element) === "number") {
            setScreen(element);
        } else {
            setSplashState("out");
        }
    }

    return (
        <div className={`splash ${splashState} `}>
            <div className="splashScreen">
                <Screen
                    img={"https://locogpt.sirv.com/Images/illustrations/hand-3.png"}
                    navController={navController}
                    p={<p className='p'>Welcome to a world of intelligent possibilities. LocoGPT is here to revolutionize the way you live, work, and interact with technology.</p>}
                    title={<div className="title">Introducing LocoGPT<br />Your Smart AI Assistant</div>}
                    screen_x={screen_x}
                    type={0}
                    key={`${Math.random().toString(27)}`}
                />
                <Screen
                    img={"https://locogpt.sirv.com/Images/illustrations/hand-1.png"}
                    navController={navController}
                    title={<div className="title">Empower Yourself with LocoGPT</div>}
                    p={<p className='p'>Unleash the full potential of artificial intelligence with LocoGPT. From advanced task management to insightful recommendations, LocoGPT is your ultimate AI companion.</p>}
                    screen_x={screen_x}
                    type={1}
                    key={`${Math.random().toString(27)}`}
                />
                <Screen
                    img={"https://locogpt.sirv.com/Images/illustrations/hand-5.png"}
                    navController={navController}
                    title={<div className="title">Discover the Magic of LocoGPT</div>}
                    p={<p className='p'>Experience the future of AI with LocoGPT. Let it simplify your day-to-day life, assist you with complex tasks, and make your world smarter, faster, and more efficient.</p>}
                    screen_x={screen_x}
                    type={2}
                    key={`${Math.random().toString(27)}`}
                />
            </div>
        </div>
    )
}

export default SPlashScreen
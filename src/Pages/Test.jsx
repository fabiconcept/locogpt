import React, { useCallback } from 'react';
import {SayButton} from 'react-say';

const MyComponent = () => {
    const selector = useCallback(voices => [...voices].find(v => v.lang === 'en-Gb'), []);

    return (
        <SayButton
            speak="A quick brown fox jumped over the lazy dogs."
            voice={selector}
        >Speak</SayButton>
    );
};

export default MyComponent;

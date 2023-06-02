import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const LoadingPage = () => {
    const [isDone, setIsDone]= useState(false);

    useEffect(()=>{
        setTimeout(() => {
            setIsDone(true);
        }, 5000);
    }, []);

    return (
        <div className={`loading ${isDone ? "hide" : ""}`}>
            <div>
                <span>L</span><span>O</span><span>C</span><span>O</span><span>G</span><span>P</span><span>T</span>
            </div>
        </div>
    )
}

export default LoadingPage
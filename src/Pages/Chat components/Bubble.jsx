import React from 'react';
import { getTimeAgo } from '../../Utilities/utilityFunctions';

const Bubble = ({ type, text, timestamp }) => {
    return (
        <div className={`bubble ${type === 1 ? "from" : ""}`} data-timestamp={`${getTimeAgo(timestamp)}`}>
            {text}
        </div>
    )
}

export default Bubble;
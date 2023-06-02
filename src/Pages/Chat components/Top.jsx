import React, { useContext } from 'react'
import { appContext } from '../../App';

const Top = () => {
    const { setSplashState } = useContext(appContext);
    return (
        <div className="top">
            <div>
                <div className="clickable" onClick={()=>setSplashState("in")}>
                    <img src="https://locogpt.sirv.com/Images/icons/arrow-left.svg" alt="" />
                </div>
            </div>
            <div>
                <div className="title">LocoGPT</div>
            </div>
            <div>
                <div className="clickable">
                    <img src="https://locogpt.sirv.com/Images/icons/ellipsis-v.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Top
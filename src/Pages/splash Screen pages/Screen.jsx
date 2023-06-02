import React, { useEffect } from 'react';

const Screen = ({ screen_x, navController, img, title, p, type }) => {

    const handleNavKeys = (e) => {
        const key = e;
        const keyCode = key.code;

        if (screen_x === type) {
            switch (keyCode) {
                case "ArrowRight":
                    if (type < 2) {
                        navController(type + 1);
                    }else{
                        navController(0);
                    }
                    break;
                case "ArrowLeft":
                    if (type > 0) {
                        navController(type - 1);
                    }else{
                        navController(2);
                    }
                    break;

                default:
                    break;
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", e => handleNavKeys(e));

        return (
            document.removeEventListener("keydown", e => handleNavKeys(e))
        );
    }, []);

    return (
        <section className={`${screen_x === type ? "in" : "out"}`}>
            <div className="img">
                <img src={img} alt="" />
            </div>
            <div className="txt-bar">
                <div className="title">{title} </div>
                {p}
                <div className="bottom-bar">
                    {type === 0 && <div className="elipsis">
                        <div className='active'></div>
                        <div onClick={() => navController(1)}></div>
                        <div onClick={() => navController(2)}></div>
                    </div>}
                    {type === 1 && <div className="elipsis">
                        <div onClick={() => navController(0)} className='active'></div>
                        <div className='active'></div>
                        <div onClick={() => navController(2)}></div>
                    </div>}
                    {type === 2 && <div className="elipsis">
                        <div onClick={() => navController(0)} className='active'></div>
                        <div onClick={() => navController(1)} className='active'></div>
                        <div className='active'></div>
                    </div>}

                    <div className="btnx-row">
                        {type > 0 && <div className="btnx" onClick={() => navController(type - 1)}>
                            <img src="img/icons/arrow-left.svg" alt="" />
                        </div>}
                        {type < 2 && <div className="btnx" onClick={() => navController(type + 1)}>
                            <img src="img/icons/arrow-right.svg" alt="" />
                        </div>}
                        {type === 2 && <div className="btnx" onClick={navController}>
                            <img src="img/icons/robot.svg" alt="" />
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Screen;
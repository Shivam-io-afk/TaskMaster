import React from 'react';
import '../App.css';

const tasks = () => {
    return (
        <div className="taskcontainer">
            <div className="main_tskcnt">
                <div className="cnt w_fr">
                    <div className="indicator"></div>
                    <div className="slider_bx"></div>
                </div>
                <div className="cnt w_sc"></div>
                <div className="cnt w_thr"></div>
                <div className="cnt w_frt"></div>
            </div>
        </div>
    );
}


export default tasks;
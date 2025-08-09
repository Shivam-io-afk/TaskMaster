import React, { useEffect } from "react";
import Meetings from "./MoreSectionPage/Meeting";
import AIChatBox from "./MoreSectionPage/AIChatBox";
import RealTimeChat from "./MoreSectionPage/RealTimeChat";
import TaskPrioritization from "./MoreSectionPage/TaskPrioritization";
import { useGlobalLoader } from '../context/LoaderContext';
import "../styles/morepage.css";

function MoreSection() {
    const { markDataLoaded, setContentReady } = useGlobalLoader();

    // Mark component as loaded immediately
    useEffect(() => {
        // Mark data as loaded immediately instead of waiting
        markDataLoaded();
        setContentReady();
    }, [markDataLoaded, setContentReady]);

    return (
        <div className="dashboard_more">
            <div className="box1"><Meetings /></div>
            <div className="box4"><AIChatBox /></div>
            <div className="box2"><RealTimeChat /></div>
            <div className="box3"><TaskPrioritization /></div>
        </div>
    );
}

export default MoreSection;

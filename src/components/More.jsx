import React from "react";
import Meetings from "../components/MoreSectionPage/Meeting";
import AIChatBox from "../components/MoreSectionPage/AIChatBox";
import RealTimeChat from "../components/MoreSectionPage/RealTimeChat";
import TaskPrioritization from "../components/MoreSectionPage/TaskPrioritization";
import "../styles/morepage.css";

function MoreSection() {
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

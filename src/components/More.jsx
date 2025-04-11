import React from "react";
import Meetings from "../components/MoreSectionPage/Meeting";
import AIChatBox from "../components/MoreSectionPage/AIChatBox";
import RealTimeChat from "../components/MoreSectionPage/RealTimeChat";
import TaskPrioritization from "../components/MoreSectionPage/TaskPrioritization";
import "../styles/morepage.css";

function MoreSection() {
    return (
        <div className="dashboard_more">
            <div className="dash_boxes"><Meetings /></div>
            <div className="dash_boxes"><AIChatBox /></div>
            <div className="dash_boxes"><RealTimeChat /></div>
            <div className="dash_boxes"><TaskPrioritization /></div>
        </div>
    );
}

export default MoreSection;

import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import '../../styles/customSchduler.css';

const Scheduler = () => {
    useEffect(() => {
        const licenseMessage = document.querySelector(".fc-license-message");
        if (licenseMessage) {
            licenseMessage.style.display = "none";
        }
    }, []);

    return (
        <div className="bockese">
            <FullCalendar
                plugins={[resourceTimelinePlugin, interactionPlugin]}
                initialView="resourceTimelineDay"
                editable={true}
                selectable={true}
                resourceAreaHeaderContent="Users"
                resources={[
                    { id: "1", title: "John Doe", eventColor: "#FF4560" },
                    { id: "2", title: "Jane Smith", eventColor: "#008FFB" },
                    { id: "3", title: "Mark Taylor", eventColor: "#00E396" }
                ]}
                events={[
                    { id: "1", resourceId: "1", title: "Research landing page", start: "2025-02-22T02:00:00", end: "2025-02-22T09:00:00" },
                    { id: "2", resourceId: "2", title: "Myra Icon", start: "2025-02-22T11:00:00", end: "2025-02-22T14:00:00" },
                    { id: "3", resourceId: "3", title: "Baryrose Illustration", start: "2025-02-22T08:00:00", end: "2025-02-22T11:30:00" },
                    { id: "4", resourceId: "1", title: "Shemic mobile responsive", start: "2025-02-22T06:00:00", end: "2025-02-22T11:30:00", color: "#A47BEF" }
                ]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "resourceTimelineDay,resourceTimelineWeek"
                }}
                nowIndicator={true}
                height={"325px"}
                className="box"
            />
        </div>
    );
};

export default Scheduler;



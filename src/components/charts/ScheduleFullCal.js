import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import '../../styles/customSchduler.css';

const Scheduler = () => {
    const colorArr = [
        "#FF4560", "#008FFB", "#00E396", "#A47BEF",
        "#FF5733", "#33FF57", "#5733FF", "#FFD700", "#DC143C", "#FF69B4", "#8A2BE2", "#00CED1", "#20B2AA", "#FFA07A", "#6A5ACD", "#FF4500", "#008080", "#2E8B57", "#ADFF2F", "#D2691E", "#FF8C00", "#4B0082", "#32CD32", "#8B0000", "#B22222", "#4682B4", "#556B2F",
        "#7FFF00", "#8FBC8F", "#9370DB", "#C71585", "#DB7093", "#FF1493", "#191970", "#708090", "#6B8E23", "#FF6347", "#4169E1", "#FF00FF", "#00FA9A", "#CD5C5C", "#F4A460", "#B0C4DE", "#7B68EE", "#DAA520", "#FFB6C1", "#20B2AA", "#00BFFF", "#DDA0DD", "#87CEFA", "#A0522D", "#2F4F4F", "#DC143C", "#F08080"
    ];

    FunctionCustom();
    
    return (
        <div className="bockese">
            <FullCalendar
                plugins={[resourceTimelinePlugin, interactionPlugin]}
                initialView="resourceTimelineDay"
                editable={false}
                selectable={true}
                resourceAreaHeaderContent="Today's"
                resources={[
                    { id: "1", title: "Jhon Cena", eventColor: colorArr[0] },
                    { id: "2", title: "Randy Orton", eventColor: colorArr[1] },
                    { id: "3", title: "Triple H", eventColor: colorArr[2] }
                ]}
                events={[
                    { id: "1", resourceId: "1", title: "Research landing page", start: "2025-02-23T02:00:00", end: "2025-02-23T10:00:00" },
                    { id: "2", resourceId: "2", title: "Myra Icon", start: "2025-02-23T11:00:00", end: "2025-02-23T18:00:00" },
                    { id: "3", resourceId: "3", title: "Baryrose Illustration", start: "2025-02-23T08:00:00", end: "2025-02-23T16:30:00" },
                    { id: "4", resourceId: "1", title: "Shemic mobile responsive", start: "2025-02-23T06:00:00", end: "2025-02-23T14:30:00", color: colorArr[3] }
                ]}
                headerToolbar={{
                    left: "title",
                    center: "",
                    right: "resourceTimelineDay,resourceTimelineWeek"
                }}

                nowIndicator={true}
                height={"325px"}
            />
        </div>
    );
};

export default Scheduler;


const FunctionCustom = () => {
    useEffect(() => {
        const licenseMessage = document.querySelector(".fc-license-message");
        if (licenseMessage) {
            licenseMessage.style.display = "none";
        }
    }, []);

}
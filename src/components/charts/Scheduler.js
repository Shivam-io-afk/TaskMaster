import React, { useState, useCallback, useMemo } from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

// Extend dayjs with isBetween plugin
dayjs.extend(isBetween);

function SchedulerComponent() {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((range) => {
    setRange(range);
  }, []);

  // Mocked scheduler data (moved above usage)
  const mockedSchedulerData : SchedulerData = [
    {
      id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
      label: {
        icon: "https://picsum.photos/24",
        title: "Joe Doe",
        subtitle: "Frontend Developer",
      },
      data: [
        {
          id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
          startDate: new Date("2023-04-13T15:31:24.272Z"),
          endDate: new Date("2023-08-28T10:28:22.649Z"),
          occupancy: 3600,
          title: "Project A",
          subtitle: "Subtitle A",
          description: "array indexing Salad West Account",
          bgColor: "rgb(254,165,177)",
        },
      ],
    },
  ];

  // Filtering events based on selected date range
  const filteredMockedSchedulerData = mockedSchedulerData.map((person) => ({
    ...person,
    data: person.data.filter(
      (project) =>
        dayjs(project.startDate).isBetween(range.startDate, range.endDate, null, "[]") ||
        dayjs(project.endDate).isBetween(range.startDate, range.endDate, null, "[]") ||
        (dayjs(project.startDate).isBefore(range.startDate, "day") &&
          dayjs(project.endDate).isAfter(range.endDate, "day"))
    ),
  }));

  return (
    <section>
      <Scheduler
        data={filteredMockedSchedulerData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => setFilterButtonState(1)}
        onClearFilterData={() => setFilterButtonState(0)}
        config={{ zoom: 0, filterButtonState }}
      />
    </section>
  );
}

export default SchedulerComponent;

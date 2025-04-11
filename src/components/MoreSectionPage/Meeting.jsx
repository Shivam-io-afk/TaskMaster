

const meetings = [
  {
    title: 'Team Sync',
    time: '10:00 AM - 10:30 AM',
    date: 'April 12, 2025',
    participants: ['You', 'John', 'Priya']
  },
  {
    title: 'AI Summary Planning',
    time: '2:00 PM - 3:00 PM',
    date: 'April 13, 2025',
    participants: ['You', 'AI Bot', 'Ravi']
  }
];

const MeetingSchedule = () => {
  return (
    <div className="meeting-container">
      <h2>📅 Meeting Schedule</h2>
      <div className="meeting-list">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-card">
            <h3>{meeting.title}</h3>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Time:</strong> {meeting.time}</p>
            <p><strong>Participants:</strong> {meeting.participants.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSchedule;

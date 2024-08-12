// src/components/AttendancePage.jsx
import React, { useState } from 'react';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [volunteerName, setVolunteerName] = useState('');
  const [status, setStatus] = useState('');

  const recordAttendance = () => {
    setAttendance([...attendance, { volunteerName, status }]);
    setVolunteerName('');
    setStatus('');
  };

  return (
    <div>
      <h1>Attendance Page</h1>
      <input 
        type="text" 
        placeholder="Volunteer Name" 
        value={volunteerName} 
        onChange={(e) => setVolunteerName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Status (Present/Absent/OD)" 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
      />
      <button onClick={recordAttendance}>Record Attendance</button>
      <ul>
        {attendance.map((record, index) => (
          <li key={index}>{`${record.volunteerName}: ${record.status}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendancePage;

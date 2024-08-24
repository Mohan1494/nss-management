// src/components/AttendancePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchSheetData, updateSheetData, initClient, signIn, signOut } from '../googleSheetAPI.js';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [volunteerName, setVolunteerName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    gapi.load('client:auth2', initClient); // Initialize Google API client
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSheetData();
      setAttendance(data);
    };

    fetchData();
  }, []);

  const recordAttendance = async () => {
    const newRecord = { date, volunteerName, status };
    await updateSheetData(newRecord); // Update sheet data
    setAttendance([...attendance, newRecord]); // Update local state
    setVolunteerName('');
    setStatus('');
    setDate('');
  };

  return (
    <div>
      <h1>Attendance Page</h1>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
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
          <li key={index}>{`${record.date} - ${record.volunteerName}: ${record.status}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendancePage;

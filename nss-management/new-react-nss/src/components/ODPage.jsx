// src/components/ODPage.jsx
import React, { useState } from 'react';

const ODPage = () => {
  const [odRequests, setOdRequests] = useState([]);
  const [volunteerName, setVolunteerName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const submitOdRequest = () => {
    if (!volunteerName || !reason || !date) {
      alert("Please fill all fields!");
      return;
    }

    const newRequest = { volunteerName, reason, date };

    setOdRequests([...odRequests, newRequest]);
    setVolunteerName('');
    setReason('');
    setDate('');

    // Logic to update Google Sheet or Backend with OD requests would go here
  };

  return (
    <div>
      <h1>OD Page</h1>
      <input 
        type="text" 
        placeholder="Volunteer Name" 
        value={volunteerName} 
        onChange={(e) => setVolunteerName(e.target.value)} 
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Reason" 
        value={reason} 
        onChange={(e) => setReason(e.target.value)} 
      />
      <button onClick={submitOdRequest}>Submit OD Request</button>
      
      <h2>OD Requests</h2>
      <ul>
        {odRequests.map((request, index) => (
          <li key={index}>{`${request.date} - ${request.volunteerName}: ${request.reason}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ODPage;

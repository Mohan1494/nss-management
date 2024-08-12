// src/components/EventsPage.jsx
import React, { useState } from 'react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const addEvent = () => {
    setEvents([...events, { eventName, eventDate }]);
    setEventName('');
    setEventDate('');
  };

  return (
    <div>
      <h1>Events Page</h1>
      <input 
        type="text" 
        placeholder="Event Name" 
        value={eventName} 
        onChange={(e) => setEventName(e.target.value)} 
      />
      <input 
        type="date" 
        placeholder="Event Date" 
        value={eventDate} 
        onChange={(e) => setEventDate(e.target.value)} 
      />
      <button onClick={addEvent}>Add Event</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{`${event.eventName} - ${event.eventDate}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountsPage from './components/AccountsPage';
import DocTeamPage from './components/DocTeamPage';
import AttendancePage from './components/AttendancePage';
import ToolsManagementPage from './components/ToolsManagementPage';
import EventsPage from './components/EventsPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/accounts">Accounts</Link></li>
            <li><Link to="/docs">Documents</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/tools">Tools</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/docs" element={<DocTeamPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/tools" element={<ToolsManagementPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/" element={<h1>Welcome to the NSS Management System</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

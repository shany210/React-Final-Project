import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SummaryLibrary from './components/SummaryLibrary';
import TaskManagement from "./components/TaskManagement";
import Settings from './components/Settings';
import Help from './components/Help';






function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/summaries" element={<SummaryLibrary />} />
      <Route path="/tasks" element={<TaskManagement />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
}

export default App;

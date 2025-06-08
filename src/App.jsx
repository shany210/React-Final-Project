import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SummaryLibrary from './components/SummaryLibrary';
import TaskManagement from './components/TaskManagement';
import Settings from './components/Settings';
import Help from './components/Help';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from './admin/AdminDashboard';
import SummaryManagement from './admin/SummaryManagement';
import AdminUserManagement from './admin/AdminUserManagement'; 
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summaries" element={<SummaryLibrary />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/summaries" element={<SummaryManagement />} />
        <Route path="/admin/users" element={<AdminUserManagement />} /> 
      </Routes>
    </UserProvider>
  );
}

export default App;



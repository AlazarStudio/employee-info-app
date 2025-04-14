import { useState } from 'react'
import InstallButton from "./InstallButton/InstallButton";

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EmployeeProfile from './components/EmployeeProfile';
import AdminRoute from './routes/AdminRoute';
import EmployeeRoute from './routes/EmployeeRoute';
import StartRedirect from './routes/StartRedirect';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <StartRedirect />
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/employeeProfile/:id"
          element={
            <EmployeeRoute>
              <EmployeeProfile />
            </EmployeeRoute>
          }
        />

        <Route
          path="/employee/:id"
          element={
            <EmployeeRoute>
              <EmployeeDashboard />
            </EmployeeRoute>
          }
        />
      </Routes>

      {/* Кнопка установки */}
      <InstallButton />
    </>
  )
}

export default App

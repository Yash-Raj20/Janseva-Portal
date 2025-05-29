// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthProvider } from "./context/User/AuthContext";
import { AdminAuthProvider } from "./context/Admin/AuthContext";
import { NotificationProvider } from "./context/User/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <UserAuthProvider>
        <AdminAuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AdminAuthProvider>
      </UserAuthProvider>
    </Router>
);
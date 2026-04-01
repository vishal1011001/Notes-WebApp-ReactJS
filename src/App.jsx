import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import { Capacitor } from '@capacitor/core';
import { useState, useEffect } from 'react';

function App() {
  const isMobile = Capacitor.isNativePlatform();
  // const API_URL = isMobile ? 
  //   'https://subcortically-nongenetical-kanesha.ngrok-free.dev' :
  //   'http://localhost:5000';

  // const API_URL = 'https://subcortically-nongenetical-kanesha.ngrok-free.dev';

  const API_URL = 'https://notes-webapp-reactjs-1.onrender.com';

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? children : <Navigate to='/login' />;
  }

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || {});

  // Load saved font size on app mount
  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px'
    };
    document.documentElement.style.setProperty('--base-font-size', fontSizeMap[savedSize]);
  }, []);


  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Login API_URL={API_URL} setUserInfo={setUserInfo} />} />

        <Route path='/'
          element={
            <ProtectedRoute>
              <Home API_URL={API_URL} userInfo={userInfo} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';

function App() {
  const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    
    return token ? children : <Navigate to='/login' />;
  }


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
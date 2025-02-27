import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import i18n from "./i18n"; // ✅ Import i18n configuration
import PrivateRoute from './PrivateRoute';
import UserMonitor from './firebase/UserMonitor';

// Sample Data


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(() => localStorage.getItem('userId'));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('userId');
      setUser(storedUser);
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // Only run once on mount
 

  return (
    <>
   
    <Router>
    {user && <UserMonitor userId={user} /> }
      <Routes>
      <Route path="/login" element={<Login /> } />
      <Route path="/" element={<PrivateRoute/>}>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;


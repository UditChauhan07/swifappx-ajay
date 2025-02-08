import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import i18n from "./i18n"; // ✅ Import i18n configuration
import PrivateRoute from './PrivateRoute';

// Sample Data


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<PrivateRoute/>}>
      <Route path="/" element={<Dashboard/>} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;


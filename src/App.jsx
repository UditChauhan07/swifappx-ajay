import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import i18n from "./i18n"; // ✅ Import i18n configuration
import { getWorkerOrderList } from './lib/store';
import PrivateRoute from './PrivateRoute';

// Sample Data


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [workOrders, setWorkOrders] = useState([]);
  const token=localStorage.getItem('UserToken');
  const userId=localStorage.getItem('userId');
  console.log('sss',token)
  
  const getWorkOrders = () =>{
    console.log('workorder hit')
    const response=getWorkerOrderList(userId,token)
    .then((response)=>{
      console.log('response',response.data);
      setWorkOrders(response.data)
    })
  
  }
  const handleLogout = () => {
    localStorage.clear();
  }
  useEffect(()=>{
    if(token)
    {
      getWorkOrders();
    }
  },[token]);

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<PrivateRoute/>}>
      <Route path="/" element={<Dashboard workOrders={workOrders} setIsLoggedIn={setIsLoggedIn} getWorkOrders={getWorkOrders} />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;


import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Profile from './components/Profile';
import Employeelist from './components/Employeelist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/employee" element={<Employeelist/>}/>
       </Routes>
       </AuthProvider>
    </>
  );
}

export default App;

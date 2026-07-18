import './App.css'
import { Routes , Route , Navigate } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard/>}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App

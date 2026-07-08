import './App.css'
import { Routes , Route , Navigate } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Interview from './pages/Interview'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Feedback from './pages/Feedback'
function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard/>}/>    //*for testing change to Login later
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/interview' element={<Interview/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/feedback' element={<Feedback/>}/>

      <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </>
  )
}

export default App

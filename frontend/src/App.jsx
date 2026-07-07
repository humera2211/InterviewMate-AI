import './App.css'
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Summary from './pages/Summary'
import Paragraph from './pages/Paragraph'
import Chatbot from './pages/Chatbot'
function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/summary' element={<Summary/>}/>
      <Route path='/paragraph' element={<Paragraph/>}/>
      <Route path='/chatbot' element={<Chatbot/>}/>
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserManagement from './components/UserManagement'
import WeatherDashboard from './components/WeatherDashboard'
import Navbar from './components/Navbar'

function App() {

  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/user-list" element={<UserManagement />} />
        </Routes>
      </BrowserRouter>

  )
}

export default App

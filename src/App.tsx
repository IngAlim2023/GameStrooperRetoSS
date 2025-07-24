import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { UserProvider } from './context/UserProvider'
import Settings from './pages/Settings'
import Game from './pages/Game'
import { Toaster } from 'react-hot-toast'
import Score from './pages/Score'

function App() {
  

  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/play' element={<Game/>}/>
        <Route path='/score' element={<Score/>}/>
      </Routes>
      </UserProvider>
      <Toaster/>
    </Router>
  )
}

export default App

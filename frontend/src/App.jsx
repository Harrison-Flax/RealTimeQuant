// For switching between pages
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/cover.css'
import { Cover } from './pages/Cover.jsx'
import { Login } from './pages/Login.jsx'
import { Page1 } from './pages/page1.jsx'
import { Page2 } from './pages/page2.jsx'
import { Page3 } from './pages/page3.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cover" element={<Cover/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/page1" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/page3" element={<Page3/>}/>
      </Routes>
    </Router>
  )
}

export default App
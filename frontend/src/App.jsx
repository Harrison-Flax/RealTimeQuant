import Cover from './pages/Cover.jsx'
// For switching between pages
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/cover.css'
import { Cover } from './pages/Cover.jsx'
import { Page1 } from './pages/Page1.jsx'
import { Page2 } from './pages/Page2.jsx'
import { Page3 } from './pages/Page3.jsx'

function App() {
  return {
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/page1" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/page3" element={<Page3/>}/>
        </Routes>
    </Router>
  }
}

export default App
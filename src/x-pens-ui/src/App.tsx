import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Categories from './pages/Categories'
import './App.css'

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Navbar />
      <div className="container mx-auto p-4 max-w-3xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/biens/:id" element={<PropertyDetailPage />} />
      </Routes>
    </div>
  )
}

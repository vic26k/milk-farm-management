import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Farmers from './pages/Farmers'
import Expenses from './pages/Expenses'
import Revenue from './pages/Revenue'
import Reports from './pages/Reports'

export default function App() {
  const [route, setRoute] = useState('dashboard')

  return (
    <div className="app">
      <Sidebar route={route} setRoute={setRoute} />
      <main className="main">
        {route === 'dashboard' && <Dashboard />}
        {route === 'farmers' && <Farmers />}
        {route === 'expenses' && <Expenses />}
        {route === 'revenue' && <Revenue />}
        {route === 'reports' && <Reports />}
      </main>
    </div>
  )
}

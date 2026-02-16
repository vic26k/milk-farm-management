import React from 'react'

export default function Sidebar({ route, setRoute }) {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: 'DB' },
    { id: 'farmers', label: 'Farmers', icon: 'FM' },
    { id: 'expenses', label: 'Expenses', icon: 'EX' },
    { id: 'revenue', label: 'Revenue', icon: 'RV' },
    { id: 'reports', label: 'Reports', icon: 'RP' }
  ]

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">MF</span>
        <div>
          <div className="brand-title">Milk Farm</div>
          <div className="brand-subtitle">Management</div>
        </div>
      </div>
      <ul className="nav">
        {links.map((item) => (
          <li key={item.id}>
            <button
              className={route === item.id ? 'active' : ''}
              onClick={() => setRoute(item.id)}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

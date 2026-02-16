import React from 'react'

export default function Sidebar({ route, setRoute }) {
  return (
    <aside className="sidebar">
      <div className="brand">Milk Farm Management</div>
      <ul className="nav">
        <li><button className={route==='dashboard'? 'active':''} onClick={()=>setRoute('dashboard')}>Dashboard</button></li>
        <li><button className={route==='farmers'? 'active':''} onClick={()=>setRoute('farmers')}>Farmers</button></li>
        <li><button className={route==='expenses'? 'active':''} onClick={()=>setRoute('expenses')}>Expenses</button></li>
        <li><button className={route==='revenue'? 'active':''} onClick={()=>setRoute('revenue')}>Revenue</button></li>
        <li><button className={route==='reports'? 'active':''} onClick={()=>setRoute('reports')}>Reports</button></li>
      </ul>
    </aside>
  )
}

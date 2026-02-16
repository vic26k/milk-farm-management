import React from 'react'
import { load } from '../utils/storage'
import { saveAs } from 'file-saver'

function toCSV(rows){
  const keys = Object.keys(rows[0]||{})
  const lines = [keys.join(','), ...rows.map(r=>keys.map(k=>('"'+String(r[k]||'')+'"').replace(/\n/g,' ')).join(','))]
  return lines.join('\n')
}

export default function Reports(){
  const data = load()

  function exportCSV(name, rows){
    const blob = new Blob([toCSV(rows)], {type:'text/csv;charset=utf-8'})
    saveAs(blob, name + '.csv')
  }

  return (
    <div>
      <div className="page-header"><h2>Reports</h2><div className="muted">Export data for accounting</div></div>

      <div className="cards">
        <div className="card">
          <h4>Expenses</h4>
          <div className="muted">{data.expenses.length} records</div>
          <button className="btn" onClick={()=>exportCSV('expenses', data.expenses)}>Export CSV</button>
        </div>
        <div className="card">
          <h4>Revenue</h4>
          <div className="muted">{data.revenue.length} records</div>
          <button className="btn" onClick={()=>exportCSV('revenue', data.revenue)}>Export CSV</button>
        </div>
        <div className="card">
          <h4>Farmers</h4>
          <div className="muted">{data.farmers.length} records</div>
          <button className="btn" onClick={()=>exportCSV('farmers', data.farmers)}>Export CSV</button>
        </div>
      </div>
    </div>
  )
}

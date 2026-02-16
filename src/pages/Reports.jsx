import React from 'react'
import { load } from '../utils/storage'
import { downloadCSV } from '../utils/csv'

export default function Reports(){
  const data = load()

  function exportCSV(name, rows, columns){
    downloadCSV(name, rows, columns)
  }

  const farmersExportRows = data.farmers.map((farmer) => {
    const deliveries = farmer.deliveries || []
    const totalLiters = deliveries.reduce((sum, delivery) => sum + (Number(delivery.liters) || 0), 0)
    return {
      id: farmer.id,
      name: farmer.name,
      phone: farmer.phone || farmer.contact || '',
      location: farmer.location,
      price: farmer.price,
      balance: farmer.balance,
      deliveriesCount: deliveries.length,
      totalLiters
    }
  })

  return (
    <div>
      <div className="page-header"><h2>Reports</h2><div className="muted">Export data for accounting</div></div>

      <div className="cards">
        <div className="card">
          <h4>Expenses</h4>
          <div className="muted">{data.expenses.length} records</div>
          <button className="btn" onClick={()=>exportCSV('expenses', data.expenses, ['id', 'date', 'category', 'description', 'amount'])}>Export CSV</button>
        </div>
        <div className="card">
          <h4>Revenue</h4>
          <div className="muted">{data.revenue.length} records</div>
          <button className="btn" onClick={()=>exportCSV('revenue', data.revenue, ['id', 'date', 'product', 'quantity', 'unitPrice', 'total'])}>Export CSV</button>
        </div>
        <div className="card">
          <h4>Farmers</h4>
          <div className="muted">{data.farmers.length} records</div>
          <button className="btn" onClick={()=>exportCSV('farmers', farmersExportRows, ['id', 'name', 'phone', 'location', 'price', 'balance', 'deliveriesCount', 'totalLiters'])}>Export CSV</button>
        </div>
      </div>
    </div>
  )
}

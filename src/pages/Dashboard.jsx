import React, { useEffect, useState } from 'react'
import { load } from '../utils/storage'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

function sum(arr, fn){return arr.reduce((s,i)=>s+ (fn?fn(i):i),0)}

export default function Dashboard(){
  const [data, setData] = useState(load())

  useEffect(()=>{
    const onStorage = ()=> setData(load())
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  },[])

  const totalMilk = sum(data.farmers.flatMap(f=>f.deliveries||[]), d=>d.liters)
  const totalExpenses = sum(data.expenses, e=>e.amount)
  const totalRevenue = sum(data.revenue, r=>r.total)
  const net = totalRevenue - totalExpenses

  const revenueVsExpense = {
    labels: ['Revenue','Expenses'],
    datasets:[{label:'Amount', data:[totalRevenue,totalExpenses], backgroundColor:['#0fb5a6','#f97316']}]
  }

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <div className="muted">Overview of key metrics</div>
      </div>

      <div className="cards">
        <div className="card"> <div className="muted">Total Milk Collected</div> <h3>{totalMilk} L</h3></div>
        <div className="card"> <div className="muted">Total Expenses</div> <h3>${totalExpenses.toFixed(2)}</h3></div>
        <div className="card"> <div className="muted">Total Revenue</div> <h3>${totalRevenue.toFixed(2)}</h3></div>
        <div className="card"> <div className="muted">Net Profit / Loss</div> <h3 style={{color: net>=0? 'green':'#ef4444'}}>${net.toFixed(2)}</h3></div>
      </div>

      <div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <h4>Revenue vs Expenses</h4>
          <Bar data={revenueVsExpense} />
        </div>
        <div className="card">
          <h4>Profit Trends</h4>
          <Line data={{labels:['Jan','Feb','Mar'], datasets:[{label:'Profit', data:[net, net*0.8, net*1.1], borderColor:'#0fb5a6'}]}} />
        </div>
      </div>
    </div>
  )
}

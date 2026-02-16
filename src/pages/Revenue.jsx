import React, { useEffect, useState } from 'react'
import { load, save } from '../utils/storage'

const getToday = () => new Date().toISOString().slice(0, 10)

export default function Revenue(){
  const [data,setData] = useState(load())
  const [form,setForm] = useState({date:getToday(),product:'Milk',quantity:0,unitPrice:0})

  useEffect(()=>{ const onStorage = ()=> setData(load()); window.addEventListener('storage', onStorage); return ()=>window.removeEventListener('storage', onStorage)},[])

  function add(){
    const total = parseFloat(form.quantity || 0) * parseFloat(form.unitPrice || 0)
    const rev = {...form, id:Date.now(), total}
    const next = {...data, revenue:[...data.revenue, rev]}
    save(next); setData(next); setForm({date:getToday(),product:'Milk',quantity:0,unitPrice:0})
  }

  return (
    <div>
      <div className="page-header"><h2>Revenue</h2><div className="muted">Record income from sales</div></div>

      <div className="card section-spacer">
        <h4>Add Revenue</h4>
        <div className="form-row">
          <input className="input" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
          <input className="input" placeholder="Product" value={form.product} onChange={e=>setForm({...form,product:e.target.value})} />
        </div>
        <div className="form-row">
          <input className="input" placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:parseFloat(e.target.value)})} />
          <input className="input" placeholder="Unit Price" type="number" value={form.unitPrice} onChange={e=>setForm({...form,unitPrice:parseFloat(e.target.value)})} />
        </div>
        <button className="btn" onClick={add}>Add Revenue</button>
      </div>

      <div className="card">
        <h4>Revenue List</h4>
        <table className="table"><thead><tr><th>Date</th><th>Product</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
          <tbody>
            {data.revenue.map(r=> <tr key={r.id}><td>{r.date}</td><td>{r.product}</td><td>{r.quantity}</td><td>${(r.unitPrice||0).toFixed(2)}</td><td>${(r.total||0).toFixed(2)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

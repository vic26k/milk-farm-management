import React, { useEffect, useState } from 'react'
import { load, save } from '../utils/storage'

const categories = ['Farmer Payments','Milk Processing','Equipment Maintenance','Transportation','Workers Wages','Other']

export default function Expenses(){
  const [data,setData] = useState(load())
  const [form,setForm] = useState({date:'',category:categories[0],description:'',amount:0})

  useEffect(()=>{ const onStorage = ()=> setData(load()); window.addEventListener('storage', onStorage); return ()=>window.removeEventListener('storage', onStorage)},[])

  function add(){
    const exp = {...form, id:Date.now(), amount: parseFloat(form.amount)}
    const next = {...data, expenses:[...data.expenses, exp]}
    save(next); setData(next); setForm({date:'',category:categories[0],description:'',amount:0})
  }

  return (
    <div>
      <div className="page-header"><h2>Expenses</h2><div className="muted">Track outgoing costs</div></div>

      <div className="card" style={{marginBottom:12}}>
        <h4>Add Expense</h4>
        <div className="form-row">
          <input className="input" placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
          <select className="select" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <input className="input" placeholder="Amount" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} />
        </div>
        <button className="btn" onClick={add}>Add Expense</button>
      </div>

      <div className="card">
        <h4>Expense List</h4>
        <table className="table"><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead>
          <tbody>
            {data.expenses.map(e=> <tr key={e.id}><td>{e.date}</td><td>{e.category}</td><td className="muted">{e.description}</td><td>${(e.amount||0).toFixed(2)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

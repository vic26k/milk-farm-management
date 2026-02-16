import React, { useEffect, useState } from 'react'
import { load, save } from '../utils/storage'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

export default function Farmers(){
  const [data,setData] = useState(load())
  const [form, setForm] = useState({name:'',phone:'',location:'',price:0})

  useEffect(()=>{
    const onStorage = ()=> setData(load())
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  },[])

  function add(){
    const f = {...form, id:Date.now(), deliveries:[], balance:0}
    const next = {...data, farmers:[...data.farmers, f]}
    save(next); setData(next); setForm({name:'',phone:'',location:'',price:0})
  }

  function addDelivery(farmerId){
    const liters = parseFloat(prompt('Amount delivered in liters')) || 0
    if (liters <= 0) return
    const date = getToday()
    const next = {...data, farmers: data.farmers.map(f=> f.id===farmerId ? {...f, deliveries:[...(f.deliveries||[]), {date, liters}], balance: (f.balance||0) + liters*(f.price||0) } : f)}
    save(next); setData(next)
  }

  function markPaid(farmerId){
    const next = {...data, farmers: data.farmers.map(f=> f.id===farmerId ? {...f, balance:0} : f)}
    save(next); setData(next)
  }

  return (
    <div>
      <div className="page-header"><h2>Farmers</h2><div className="muted">Manage farmer profiles and deliveries</div></div>

      <div className="card section-spacer">
        <h4>Add Farmer</h4>
        <div className="form-row">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        </div>
        <div className="form-row">
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          <input className="input" placeholder="Price per liter" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
        </div>
        <button className="btn" onClick={add}>Add Farmer</button>
      </div>

      <div className="card">
        <h4>Farmer List</h4>
        <div className="muted section-spacer">Delivery date is saved automatically as today&apos;s date.</div>
        <table className="table">
          <thead><tr><th>Name</th><th>Phone</th><th>Location</th><th>Price/L</th><th>Delivered (L)</th><th>Last Delivery</th><th>Balance</th><th>Actions</th></tr></thead>
          <tbody>
            {data.farmers.map(f=> (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td className="muted">{f.phone || f.contact || '-'}</td>
                <td>{f.location}</td>
                <td>${(f.price||0).toFixed(2)}</td>
                <td>{(f.deliveries || []).reduce((sum, d) => sum + (Number(d.liters) || 0), 0).toFixed(2)}</td>
                <td>{(f.deliveries && f.deliveries.length) ? f.deliveries[f.deliveries.length - 1].date : '-'}</td>
                <td>${(f.balance||0).toFixed(2)}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn" onClick={()=>addDelivery(f.id)}>Add Delivery</button>
                    <button className="btn" onClick={()=>markPaid(f.id)}>Mark Paid</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

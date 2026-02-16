import React, { useEffect, useState } from 'react'
import { load, save } from '../utils/storage'

export default function Farmers(){
  const [data,setData] = useState(load())
  const [form, setForm] = useState({name:'',contact:'',location:'',price:0})

  useEffect(()=>{
    const onStorage = ()=> setData(load())
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  },[])

  function add(){
    const f = {...form, id:Date.now(), deliveries:[], balance:0}
    const next = {...data, farmers:[...data.farmers, f]}
    save(next); setData(next); setForm({name:'',contact:'',location:'',price:0})
  }

  function addDelivery(farmerId){
    const liters = parseFloat(prompt('Liters supplied'))||0
    const date = prompt('Date (YYYY-MM-DD)')||new Date().toISOString().slice(0,10)
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

      <div className="card" style={{marginBottom:12}}>
        <h4>Add Farmer</h4>
        <div className="form-row">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Contact" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        </div>
        <div className="form-row">
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          <input className="input" placeholder="Price per liter" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
        </div>
        <button className="btn" onClick={add}>Add Farmer</button>
      </div>

      <div className="card">
        <h4>Farmer List</h4>
        <table className="table">
          <thead><tr><th>Name</th><th>Contact</th><th>Location</th><th>Price/L</th><th>Balance</th><th>Actions</th></tr></thead>
          <tbody>
            {data.farmers.map(f=> (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td className="muted">{f.contact}</td>
                <td>{f.location}</td>
                <td>${(f.price||0).toFixed(2)}</td>
                <td>${(f.balance||0).toFixed(2)}</td>
                <td>
                  <button className="btn" onClick={()=>addDelivery(f.id)} style={{marginRight:8}}>Add Delivery</button>
                  <button className="btn" onClick={()=>markPaid(f.id)}>Mark Paid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

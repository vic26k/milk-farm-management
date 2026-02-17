import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initFirebase } from './firebase'
import { KEY } from './utils/storage'

// Initialize Firebase (if enabled) and merge remote state into localStorage
initFirebase().then(remote => {
  if (remote) {
    try{
      localStorage.setItem(KEY, JSON.stringify(remote))
      // notify in-app listeners; components in this app also listen for 'storage'
      window.dispatchEvent(new Event('storage'))
    }catch(e){console.error('failed to merge remote data', e)}
  }
}).catch(()=>{})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const KEY = 'milk_farm_data_v1'

export function load(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {farmers:[], expenses:[], revenue:[]}
  }catch(e){
    return {farmers:[], expenses:[], revenue:[]}
  }
}

export function save(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}

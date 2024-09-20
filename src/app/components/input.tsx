import React from 'react'

function Input({placeholder, onChange}) {
  return (
    <input onChange={onChange} placeholder={placeholder} className='bg-zinc-800 border border-zinc-700 focus-within:outline-none p-3 '/>
  )
}

export default Input
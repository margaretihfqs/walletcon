"use client"
import React from 'react'
function Button({children,onClick}) {
  return (
    <button
            className="bg-white w-[50%] p-4 rounded-lg font-semibold hover:cursor-pointer text-black hover:bg-zinc-200"
            onClick={onClick}
          >
            {children}
          </button>
  )
}

export default Button;
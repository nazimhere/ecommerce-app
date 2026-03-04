import React from 'react'
import { assets } from "../assets/assets"

const navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="" />
      <button>Logout</button>
    </div>
  )
}
export default navbar

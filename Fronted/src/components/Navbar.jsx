import React from 'react'
import { useAuthStore } from '../store/UseAuthStore'

const Navbar = () => {
  const {authUser} =useAuthStore()
  return (
    <div>Navbar</div>
  )
}

export default Navbar
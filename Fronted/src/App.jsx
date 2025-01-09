import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Loginpage from './pages/Loginpage'
import SettingsPage from './SettingsPage'
import ProfilePage from './ProfilePage'


import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/UseAuthStore'
import { useEffect } from 'react';

// import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'
import SignupPage from './pages/SignupPage'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log( authUser )

  // if (isCheckingAuth && !authUser) 
  //   return (
  //   <div className='flex items-center justify-center h-screen'>
  //     {/* <Loader className="size-10 animate-spin" /> */}
  //   </div>
  // );

  return (
    <div>
      <Navbar />

      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={!authUser ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
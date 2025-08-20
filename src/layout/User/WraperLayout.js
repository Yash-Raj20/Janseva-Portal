import React from 'react'
import Navbar from '../../components/User/Navbar'
import Footer from '../../components/User/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function WraperLayout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/dashboard");
  return (
    <>
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  )
}

export default WraperLayout

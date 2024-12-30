import React, { useEffect } from 'react'
import Topbar from './Topbar'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import MenuMobile from './MenuMobile'


const MainLayout = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [location.pathname])
    return (
        <div>
            <Topbar />
            <Header />
            <Outlet />
            <Footer/>
            <MenuMobile/>
        </div>
    )
}

export default MainLayout
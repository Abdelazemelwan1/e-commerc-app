import React, { useEffect, useState } from 'react';
import Style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';


export default function Layout() {
    
  return <>

    <Navbar/>
    <div className="container max-w-[90%]   sm:max-w-[36rem] md:max-w-[45rem] lg:max-w-[62rem]  xl:max-w-[74rem]  2xl:max-w-[88rem]  mx-auto mt-[70px]">

    <Outlet />
    </div>
    <Footer />
  </>
  
}

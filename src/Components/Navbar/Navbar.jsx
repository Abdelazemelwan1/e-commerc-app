import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from "./Navbar.module.css"
import logo from "../../assets/logo.svg"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Instagram , Facebook , Twitter , Linkedin , Youtube , Mail  , LogOut, ShoppingCart} from 'lucide-react';
import { authContext } from '../../Context/AuthConTextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import { CiHeart } from 'react-icons/ci';
import { WishListContext } from '../../Context/WishlistContextProvider';


export default function Navbar() {
    let { count,length  } = useContext(WishListContext);
  let {  numofCart } = useContext(cartContext)
  let {token , setToken} = useContext(authContext);
  let Navigate = useNavigate()

  function LogOutAccont() {
    localStorage.removeItem("token");
    setToken(null)
    Navigate("/login")
  }
  

  let nav = useRef(null)
  
  const hideNav = ()=> {
    nav.current.classList.add('hidden')
  }

  return <>

<nav className=" bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-600">
 
 <div className='m:max-w-[36rem] md:max-w-[44rem] lg:max-w-[60rem]  xl:max-w-[74rem]  2xl:max-w-[88rem] container mx-auto'>

  <div className="max-w-screen-xl flex flex-nowrapwrap items-start justify-between mx-auto p-4">
    <div className='block md:flex items-center lg:items-start'>
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="freshCart Logo" />
      </Link>
      <div ref={nav} className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        {token && token !== undefined &&  
        <ul onClick={()=>hideNav()} className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className='mx-2.5 my-1.5'>
            <NavLink to="/" className="text-slate-600 hover:text-green-600 transition duration-300 capitalize my-8" aria-current="page">Home</NavLink>
          </li>
          <li className='mx-2.5 my-1.5'>
            <NavLink to="/Product" className="text-slate-600 hover:text-green-600 transition duration-300 capitalize">Product</NavLink>
          </li>
          <li className='mx-2.5 my-1.5'>
            <NavLink to="/Brands" className="text-slate-600 hover:text-green-600 transition duration-300 capitalize ">Brands</NavLink>
          </li>
          <li className='mx-2.5 my-1.5'>
            <NavLink to="/Categories" className="text-slate-600 hover:text-green-600 transition duration-300 capitalize ">Categories</NavLink>
          </li>
          <li className='mx-2.5 my-1.5'>
            <NavLink to="/allorders" className="text-slate-600 hover:text-green-600 transition duration-300 capitalize ">Order</NavLink>
          </li>
          <ul className="flex mx-2.5 my-1.5 gap-2.5 ms-auto items-center justify-center">

            {/* <li className='md:hidde n flex ms-2.5'><ShoppingCart   className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li> */}
            <li className='md:hidden flex ms-2.5'><Instagram  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
            <li className='md:hidden flex'><Facebook className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
            <li className='md:hidden flex'><Mail className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
            <li className='md:hidden flex'><Twitter  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
            <li className='md:hidden flex'><Linkedin  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
            <li className='md:hidden flex'><Youtube  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
            {/* <li className='md:hidden flex'><ShoppingCart  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li> */}
          </ul>
        </ul>}
      </div>
    </div>

    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <ul className="flex gap-2.5 ms-auto items-center justify-center">
          {/* <li className='hidden md:flex'><Instagram  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Facebook className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
          <li className='hidden md:flex'><Mail className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
          <li className='hidden md:flex'><Twitter  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Linkedin  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Youtube  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li> */}
          {/* <li className='hidden md:flex relative border rounded-full w-8 h-8 justify-center items-center'> <span className='bg-gray-500 p-1 rounded-full absolute bottom-[60%] start-[50%]'>{numofCart>0?numofCart : "0"}</span> <Link to="/cart"><ShoppingCart  className="w-4 cursor-pointer z-30 text-slate-600 hover:text-green-600 transition duration-300"/></Link></li> */}
          {token ?    <>
            <li className=' flex relative  rounded-full w-8 h-8 justify-center items-center '> <span className='bg-green-500 p-3.5 w-5 h-5 flex items-center justify-center rounded-full absolute bottom-[60%] start-[50%]'>{length>0?length : "0"}</span><Link className='w-10 text-2xl ' to="/WishList"><CiHeart  className="w-10 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></Link></li>
          <li className=' flex relative  rounded-full w-8 h-8 justify-center items-center'> <span className='bg-green-500 p-3.5 w-5 h-5 flex items-center justify-center rounded-full absolute bottom-[60%] start-[50%]'>{numofCart>0?numofCart : "0"}</span><Link to="/cart"><ShoppingCart  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></Link></li>
            <li className='ml-2.5'><span onClick={()=>LogOutAccont()} className="outline-none flex text-white bg-green-700 hover:bg-green-800   font-light rounded-lg text-sm px-3 py-2 ms-auto  dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer items-center gap-2"> <LogOut /></span></li> </>   : 
          <>
          <li className='hidden md:flex'><Instagram  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Facebook className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
          <li className='hidden md:flex'><Mail className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300" /></li>
          <li className='hidden md:flex'><Twitter  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Linkedin  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          <li className='hidden md:flex'><Youtube  className="w-4 cursor-pointer text-slate-600 hover:text-green-600 transition duration-300"/></li>
          
          <li><NavLink className="hover:text-green-600 transition duration-300 capitalize" to="/login">login</NavLink></li>
          <li><NavLink className="hover:text-green-600 transition duration-300 capitalize" to="/register">register</NavLink></li>
          </>
          }

      </ul>
      {token &&
      <button data-collapse-toggle="navbar-sticky" type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button> }
    </div>
  </div>
 </div>
 
</nav>

  </>
  
}

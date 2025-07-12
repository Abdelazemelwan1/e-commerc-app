import React, { useContext, useEffect, useState } from 'react';
import Style from "./Cart.module.css"
import UseTitle from '../UseTitle/UseTitle';
import { cartContext } from '../../Context/CartContextProvider';
import CartItem from '../CartItem/CartItem';
import { RingLoader } from 'react-spinners';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Minus, Plus, ShoppingCart, Trash } from 'lucide-react';
import Home from './../Home/Home';
import { FaArrowLeft } from 'react-icons/fa';

export default function Cart() {
    UseTitle('Cart');
    let {getLoggedUserCart, DeleteCart, updataQuantityProduct,isLodaing , removeItem , products , numofCart , totalPrice} = useContext(cartContext)
    
    
useEffect(()=>{
  getLoggedUserCart()
},[])

async function removeItemFromCart(id) {
  let flag = await removeItem(id);
  if (flag) {
      toast.success("Deleted !",{
        duration: 4000,
        removeDelay: 100
      })
    }else{
      toast.error("this is an error!")

    }
}

async function updateProduct(id,count) {
  let flag = await updataQuantityProduct(id,count);

  if (flag) {
      toast.success("updated !",{
        duration: 4000,
        removeDelay: 100
      })
    }else{
      toast.error("this is an error!")

    }
}
async function DeleteAllCart() {
  let flag = await DeleteCart();
  if (flag) {
      toast.success("Deleted All Cart !",{
        duration: 4000,
        removeDelay: 100
      })
    }else{
      toast.error("this is an error!")
    }
}

 if (isLodaing) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 
 }
  return <>

  <section className='bg-gray-200 p-5 mt-24 mb-6 rounded-2xl'>
    <div className='flex items-center justify-between'>
      <h2 className='text-sm sm:text-xl font-semibold flex items-center gap-2 text-[#01854C]'><Link to={"/Product"} className='border-2 border-emerald-500 rounded-full p-1 me-1.5 sm:me-3'><FaArrowLeft /></Link> shop Cart <ShoppingCart className='p-0 m-0'/></h2>

    <h3 className='text-sm sm:text-xl text-emerald-600'>Total Price : {totalPrice} EGP</h3>
    </div>
    {products?.length > 0 ?<> <div className='my-6  '>
      {products?.map((product)=> <>
      <div key={product.product._id} className=' flex justify-between items-start md:items-center my-4 md:px-5 pb-3 border-2 border-transparent border-b-gray-300'>
        <div className='flex gap-5'>
          <img className='w-20 md:w-26' src={product.product.imageCover} alt={product.product.title} />
          <div className='space-y-5'>
            <div>
              <h3 className='text-md sm:text-lg font-semibold'>{product.product.title.split(" ").slice(0,2).join(" ")}</h3>
              <h3 className='text-sm sm:text-md'>{product.product.category.name}</h3>
              <h4 className='font-light text-emerald-600'>price : {product.price * product.count} EGP</h4>
            </div>
            <button onClick={()=>removeItemFromCart(product.product._id)} className=' cursor-pointer bg-red-600 text-white rounded-md px-2 md:px-4 py-2 flex items-center gap-1'><RiDeleteBin5Line/> Remove </button>
          </div>
        </div>
        <div className='flex items-center space-x-1.5 md:space-x-3'>
          <button onClick={()=>updateProduct(product.product._id,product.count+1)} className='cursor-pointer bg-emerald-600 text-white p-2 rounded-md text-md'><Plus className='w-4 h-4'/></button>
          <span>{product.count}</span>
          <button onClick={()=>updateProduct(product.product._id,product.count-1)} className='cursor-pointer bg-emerald-600 text-white p-2 rounded-md text-md'><Minus className='w-4 h-4'/></button>
        </div>
      </div>
      </>
      )}
    </div> 
    <div className='w-fit  ms-auto'>
      <button onClick={DeleteAllCart} className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer'>CLEAR CART</button>
    </div></>: <div className='my-6 flex justify-center items-center flex-col space-y-2'>
      <h2>Your Cart is Empty</h2>
      <button className='text-white bg-emerald-600 rounded-md px-4 py-2 '><Link to={"/"}>return to products page</Link></button>
    </div>}

    <div className='mx-auto table mt-10 '>
      <Link to={"/Payment"}  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 ">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          Payment
        </span>
      </Link>
    </div> 
  </section>

  </>
  
}

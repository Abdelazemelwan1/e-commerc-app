import React, { useContext, useEffect, useState } from 'react';
import Style from "./Payment.module.css"
import { useFormik } from 'formik';
// import  axios  from 'axios';
import { cartContext } from '../../Context/CartContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Payment() {
  const [cashFlag, setCashFlag] = useState(false)
  let {cashOrder,onlineOrder} = useContext(cartContext)
      let navigate = useNavigate()


  async function cashOrders() {
    let flag = await cashOrder()
    if (flag) {
      navigate("/allorders")
    } 
  }

  function paymentOrder(valeus) {
    let shippingAddress={
      shippingAddress:valeus
    }
    if (cashFlag) {
      cashOrders(shippingAddress)
    } else {
      onlineOrder(shippingAddress)
    }
  }
  let paymentForm = useFormik({
    initialValues:{
        details : "",
        phone : "",
        city : ""
    },
    onSubmit: paymentOrder,
  })

  return <>
  <h2 className='mt-30 text-center border-b border-t py-2 text-[#00cc74]  text-lg'>ChackOut</h2>

    <form onSubmit={paymentForm.handleSubmit} className='flex flex-col  min-h-[50vh] my-auto md:w-1/2 mx-auto mt-12'>
      <div className="relative z-0 w-full mb-5 group">
        <input
        name="details"
        value={paymentForm.values.details}
        onChange={paymentForm.handleChange}
        type="text"  id="floating_detalis" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="floating_detalis" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">detalis</label>

      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
        name="phone"
        value={paymentForm.values.phone}
        onChange={paymentForm.handleChange}
        type="tel" id="floating_Phone" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="floating_Phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
        name="city"
        value={paymentForm.values.city}
        onChange={paymentForm.handleChange}
        type="text" id="floating_city" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
      </div>
      <div className='flex justify-between items-center'>

      <button onClick={()=>setCashFlag(true)} type='submit' className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 ">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Cash
        </span>
      </button>

      <button onClick={()=>setCashFlag(false)} type='submit' className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 ">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Online
        </span>
      </button>
      </div>
    </form>
  </>
  
}

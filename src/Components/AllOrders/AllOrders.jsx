import React, { useContext, useEffect, useState } from 'react';
import Style from "./AllOrders.module.css"
import { authContext } from '../../Context/AuthConTextProvider';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export default function AllOrders() {
  let {idUser} = useContext(authContext)
  const [orders, setOrders] = useState(null)

  async function getAllOrders() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
    setOrders(data)
    
  }

  useEffect(() => {
    getAllOrders()
  },[])
  
   if (orders == null) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 
  }
  return <>
  {orders.map((order) => 
    
    <div key={order.id} className='border-2 border-gray-500/30 p-5 my-10 mt-28'>

      <div className='flex justify-between items-center'>
        <div>
          <h3>Order ID</h3>
          <h3>#{order.id}</h3>
        </div>
        <div>
          <button className='btn bg-blue-700 hover:bg-blue-800 mx-4 px-3 py-1.5 text-white cursor-pointer rounded-lg'>
            {order.isDelivered == false ? "NOT DELEI" :"DELIVERD" }
          </button>
          <button className={`btn ${order.ispaid ? "bg-green-500 hover:bg-green-600" : "bg-red-600 hover:bg-red-700"}  px-3 py-1.5 text-white cursor-pointer rounded-lg`}>
            {order.ispaid == false ? "NOT PAID" :"PAID" }
          </button>
        </div>
      </div>

      <div className='grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-4 gap-4'>
        {order.cartItems.map((product)=>
          <div key={product.product.id} className='border-2 border-gray-500/30 '>
            <img className='w-full' src={product.product.imageCover} alt={product.product.title} />
            <div className='space-y-3 p-4'>
              <div>
                <Link to={`/ProductDetails/${product.product.id}/{product.product.category.name}`}><h2 className='text-lg font-semibold line-clamp-1'>{product.product.title.split(" ",3).join(" ")}</h2></Link>
                <h3 className='text-green-500 font-semibold'>{product.product.category.name}</h3>
              </div>
              <div className='flex justify-between'>
                <h3 className=''>{product.price}EGP</h3>
                <h3 className=''>Count : {product.count}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-end'>

      <h2 className='text-green-500 '>Total Cart price : {order.totalOrderPrice} EGP</h2>
      </div>

    </div>
  )}
  </>
  
}

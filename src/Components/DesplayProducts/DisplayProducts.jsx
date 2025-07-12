import React, { useContext, useEffect, useState } from 'react';
import Style from "./DisplayProducts.module.css"
import axios from "axios";
import { Star } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import Sale from '../../assets/small_1x_sale.png'
import { MdAddShoppingCart } from 'react-icons/md';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { BiCartAlt } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { WishListContext } from '../../Context/WishlistContextProvider';
import UseTitle from '../UseTitle/UseTitle';


export default function DisplayProducts() {
  let {addToWishlist} = useContext(WishListContext)

  async function getproducts() {
       return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

    let {data , isLoading ,isError , error , isFetching} = useQuery({
    queryKey: ["product"],
    queryFn: getproducts
  })
  
  let {addProductToCart} = useContext(cartContext)

  async function addToCartProduct(id) {
    let flag = await addProductToCart(id);
    if (flag == true) {
      toast.success("Successfully added",{
        duration: 4000,
        removeDelay: 100
      })
    }else{
      toast.error("this is an error!")
    }
  }


 const [search, setSearch] = useState(" ")

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 
  }

  return <>

  <h2 className='my-5 font-medium w-fit m-auto py-2 text-xl border-4 border-transparent border-b-green-600 text-center px-6'>Shope now by popular products</h2>
  
<form className="max-w-md mx-auto mt-2">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input  onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Name Products . . . . ." required />
  </div>
</form>


  <div className="praent py-9 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    {data?.data.data.filter((product) => {
      return search?.toLowerCase() == '' ? " " : product?.category.name.toLowerCase().includes(search);
    }).map((product)=><div className='curso r-pointer overflow-hidden relative shadow-xl rounded-lg group/per' key={product._id}>
      
      <header className='relative group'>
        <img className='rounded-t-lg' src={product.imageCover} alt={product.title} />
        <div className="layer p-2  -translate-y-1/2 flex justify-center items-center gap-2 absolute  top-1/2 left-1/2 -translate-x-1/2">
          <div onClick={()=>{addToWishlist(product._id)}}  className='icon text-3xl p-1.5 w-[40px] h-[40px] flex items-center justify-center  rounded-full text-white opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-green-500 hover:bg-green-700 duration-300 cursor-pointer'>
            <CiHeart />
          </div>
          <div onClick={()=>{addToCartProduct(product._id)}} className='icon text-3xl p-1.5 w-[40px] h-[40px] flex items-center justify-center  rounded-full text-white opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-green-500 hover:bg-green-700 duration-700 cursor-pointer'>
            <BiCartAlt />
          </div>
          <div className='icon text-3xl p-1.5 w-[40px] h-[40px] flex items-center justify-center  rounded-full text-white opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-green-500 hover:bg-green-700 duration-1000 cursor-pointer'>
            <Link to={`/ProductDetails/${product._id}/${product.category.name}`}> <IoEyeOutline /></Link>
          </div>
        </div>
      </header>
        <div className='px-4'>
          <h3 className='text-lg mt-2 text-green-500'>{product.category.name}</h3>
          <h2 className='text-xl my-1'>{product.title.split(" ",2).join(" ")}</h2>
          <div className='text-gray-500 text-sm'>
            <span className=''>{product.brand.name}</span>
            <span className='mx-1'>|</span>
            {product.quantity>0?<span className='text-green-500'>Available</span>:<span className='text-red-500'>Sold Out</span>}
          </div>
          <div className='flex items-center justify-between'>
            {product.priceAfterDiscount ?<div className='flex gap-1.5 xl:gap-1'>
            <h3 className='text-red-500 line-through xl:text-[12px] 2xl:text-[16px] '>{product.price} EGP</h3>
            <h3 className='xl:text-[12px] 2xl:text-[16px] '>{product.priceAfterDiscount} EGP</h3>
            </div> :<h3 className='xl:text-[12px] 2xl:text-[16px] '>{product.price} EGP</h3>}
            
            <span className='xl:text-[12px] 2xl:text-[16px] flex items-center xl:gap-1 gap-1.5'><FaStar className='text-yellow-400' />{product.ratingsAverage}</span>
          </div>
        </div>
        {product.priceAfterDiscount &&
        <span className="absolute w-[60px] h-[60px] flex justify-start items-start top-0 end-0 text-lg font-medium m-[-7px]"><img src={Sale} alt="" /></span>
        }
      <div className='px-4 my-3 '>
        <button onClick={()=>{addToCartProduct(product._id)}} className=" translate-y-[200%] group-hover/per:translate-y-[0] duration-500 cursor-pointer relative inline-flex w-full items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <span className="relative flex items-center justify-center gap-2 w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md  group-hover:bg-transparent group-hover:dark:bg-transparent">
          <MdAddShoppingCart className='text-2xl 2xl:text-2xl xl:text-[14px]' /> Add to cart
          </span>
        </button>
      </div>

    </div>)}
  </div>
  </>
  
}

import React, { useContext, useEffect, useState } from 'react';
import Style from "./BrandsDetails.module.css"
import  axios  from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { BiCartAlt } from 'react-icons/bi';
import { CiHeart } from 'react-icons/ci';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import Sale from '../../assets/small_1x_sale.png'
import noproduct from '../../assets/no-product-found-DncxVh9z.png'
import { RingLoader } from 'react-spinners';
import { cartContext } from '../../Context/CartContextProvider';
import { toast } from 'react-hot-toast';
import { WishListContext } from '../../Context/WishlistContextProvider';


export default function BrandsDetails() {
    let {addToWishlist} = useContext(WishListContext)
  
  let {id , nameBrand} = useParams()
  const [beand, setBeand] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [relatedBrand, setRelatedBrand] = useState(null)
  let {addProductToCart} = useContext(cartContext)

  async function gitSpecificBrand(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setBeand(data.data)
  }

  async function getproducts(nameBrand) {
    setIsLoading(true)
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    let newBrand = data.data.filter((product)=>{
      return product.brand.name == nameBrand
    })
    setRelatedBrand(newBrand)
    setIsLoading(false)
    
  }
  
 async function addToCartProduct(id) {
    let flag = await addProductToCart(id);
    if (flag) {
      toast.success("Successfully added",{
        duration: 4000,
        removeDelay: 100
      })
    }else{
      toast.error("this is an error!")
    }
  }

  useEffect(()=>{
gitSpecificBrand(id)
getproducts(nameBrand)
  },[])

   if (isLoading) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 
    
  }
  return <>
  <div className='flex items-center' >

      <h2 className='text-2xl font-semibold flex items-center gap-2 text-[#01854C]'><Link to={"/Brands"} className='border-2 border-emerald-500 rounded-full p-1 me-3'><FaArrowLeft /></Link></h2>
  
    <h2 className='mt-10 font-bold w-fit m-auto text-center mb-10 py-2 text-xl border-4 border-transparent border-b-green-600  px-2'>{nameBrand} Brand</h2>
  </div>

  {relatedBrand?.length == 0 ?<img className='text-center flex items-center justify-center m-auto' src={noproduct} alt="noproduct" />:
  <div className="praent py-9 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {relatedBrand?.map((product)=><div className='curso r-pointer overflow-hidden relative shadow-xl rounded-lg group/per' key={product._id}>
        <header className='relative group'>
          <img className='rounded-t-lg' src={product.imageCover} alt={product.title} />
          <div className="layer p-2  -translate-y-1/2 flex justify-center items-center gap-2 absolute  top-1/2 left-1/2 -translate-x-1/2">
            <div onClick={()=>{addToWishlist(product._id)}} className='icon text-3xl p-1.5 w-[40px] h-[40px] flex items-center justify-center  rounded-full text-white opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-green-500 hover:bg-green-700 duration-300 cursor-pointer'>
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
          <div className='px-4 pb-5'>
            <h3 className='text-lg mt-2 text-green-500'>{product.category.name}</h3>
            <h2 className='text-xl my-1'>{product.title.split(" ",2).join(" ")}</h2>
            <div className='text-gray-500 text-sm'>
              <span className=''>{product.brand.name}</span>
              <span className='mx-1'>|</span>
              {product.quantity>0?<span className='text-green-500'>Available</span>:<span className='text-red-500'>Sold Out</span>}
            </div>
            <div className='flex items-center justify-between'>
              {product.priceAfterDiscount ?<div className='flex gap-1.5 xl:gap-1'>
              <h3 className='text-red-500 line-through xl:text-[11px] 2xl:text-[16px] '>{product.price} EGP</h3>
              <h3 className='xl:text-[11px] 2xl:text-[16px] '>{product.priceAfterDiscount} EGP</h3>
              </div> :<h3 className='xl:text-[11px] 2xl:text-[16px] '>{product.price} EGP</h3>}
              
              <span className='xl:text-[12px] 2xl:text-[16px] flex items-center xl:gap-1 gap-1.5'><FaStar className='text-yellow-400' />{product.ratingsAverage}</span>
            </div>
          </div>
          {product.priceAfterDiscount &&
          <span className="absolute w-[60px] h-[60px] flex justify-start items-start top-0 end-0 text-lg font-medium m-[-7px]"><img src={Sale} alt="" /></span>
          }
      </div>)}
    </div>
 }


  </>
  
}

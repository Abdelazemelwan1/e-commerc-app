import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from "./WishList.module.css"
import { WishListContext } from '../../Context/WishlistContextProvider';
import { ShoppingCart } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { RingLoader } from 'react-spinners';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';


export default function WishList() {
  // let [tatel, setTatel] = useState(null)
  let {getWishList , count ,length, setLength , products , setProducts, isLodaing , removeWishListItem} = useContext(WishListContext);
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

// const hideNav = ()=> {
//   nav.current.classList.add('hidden')
// }
}
  let delAll = useRef(null)
    const dellAllProd = ()=> {
      setProducts([])
      setLength(0)
    console.log(products)
  }



 useEffect(()=>{
    getWishList()
  },[])


  if (isLodaing == false) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 

    
  }



  return <>
  <div>


  <section className='bg-gray-200 p-5 mt-24 mb-6 rounded-2xl'>
  <div className='flex items-center justify-between'>
    <h2 className='text-sm sm:text-2xl font-semibold flex items-center gap-2 text-[#01854C]'><Link to={"/"} className='border-2 border-emerald-500 rounded-full p-1 me-1.5 sm:me-3'><FaArrowLeft /></Link> Favorite Products <CiHeart className='p-0 m-0'/></h2>
    <h2 className='text-sm sm:text-xl font-semibold flex items-center gap-2 text-[#01854C]'>Total Favorite : {length} </h2>
  </div>
  {products?.length > 0 ?<> <div className='my-6  '>
    {products?.map((product)=> <><div key={product._id} className=' w-full flex justify-start items-start md:items-center my-4 gap-3 md:px-5 pb-3 border-2 border-transparent border-b-gray-300'>
        <div className='overflow-hidden w-36'>

        <img className='w-full rounded-2xl border-2 border-stone-300/50' src={product.imageCover} alt={product.title} />
        </div>
        <div className='space-y-5 flex lg:items-center justify-between gap-3 w-full flex-col lg:flex-row'>
          <div>
           <Link to={`/ProductDetails/${product._id}/${product?.category?.name}`}><h3 className='text-md sm:text-lg text-green-700 hover:text-green-500 cursor-pointer font-bold'>{product?.title?.split(" ").slice(0,2).join(" ")}</h3> </Link> 
            <h3 className='text-md sm:text-lg flex items-center gap-2 text-[#00cc74]'><span className='mr1-1 text-[#01854C]'>Rate :</span> <FaStar className='text-[#FACC15]'/> {product.ratingsAverage}</h3>
            <h3 className='text-md sm:text-lg flex items-center gap-2 text-[#00cc74]'><span className='mr1-1 text-[#01854C]'>Price :</span> {product.price} EGP</h3>
            <h3 className='text-[11px] sm:text-md flex items-center gap-2 '>{product?.category?.name} | {product?.brand?.name} | {product.quantity>0?<span className='text-green-500'>Available</span>:<span className='text-red-500'>Sold Out</span>}</h3>
          </div>
          <div className='flex gap-3 items-center justify-center flex-col sm:flex-row'>
            <button 
            onClick={()=>{addToCartProduct(product._id)}}
             className='rounded-full px-5 cursor-pointer transition-all bg-green-500 hover:bg-green-600 text-white    md:px-4 py-2 flex items-center gap-1'><ShoppingCart/> ADD TO CART </button>
            <button onClick={()=>removeWishListItem(product._id)} className='rounded-full px-5 cursor-pointer transition-all bg-red-600 hover:bg-red-700 text-white md:px-4 py-2 flex items-center gap-1'><RiDeleteBin5Line/> Remove </button>
          </div>
        </div>


    </div>
    </>
    )}
  </div> 
  <div className='w-fit  ms-auto'>
    <button 
    ref={delAll}
    onClick={dellAllProd}
      className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer'>CLEAR CART</button>
  </div>
  </>
  : <div className='my-6 flex justify-center items-center flex-col space-y-2'>
    <h2>Your WishList is Empty</h2>
    <button className='text-white bg-emerald-600 rounded-md px-4 py-2 '><Link to={"/"}>return to products page</Link></button>
  </div>}

</section>
  </div>
  </>
  
}

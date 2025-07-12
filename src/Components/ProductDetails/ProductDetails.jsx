import React, { useContext, useEffect, useState } from 'react';
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { RingLoader } from 'react-spinners';
import { MdAddShoppingCart } from 'react-icons/md';
import { RiCloseLargeLine } from 'react-icons/ri';
import { CiHeart } from 'react-icons/ci';
import { BiCartAlt } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';
import Sale from '../../assets/small_1x_sale.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Autoplay, Pagination } from 'swiper/modules';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { WishListContext } from '../../Context/WishlistContextProvider';




export default function ProductDetails() { 
   let {addToWishlist} = useContext(WishListContext)
  const [isLodaing, setIsLodaing] = useState(false)
  const [productDetails, setproductDetails] = useState(null)
  let {id , category} = useParams()
  const [relatedProduct, SetrelatedProduct] = useState(null)
 let {addProductToCart} = useContext(cartContext)

  async function getSpecificProduct(id) {
    setIsLodaing(true);
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setproductDetails(data.data);
    setIsLodaing(false)
  }


   async function getproducts(category) {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    let newProduct = data.data.filter((product)=>{
        return product.category.name == category
    })
    SetrelatedProduct(newProduct)
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
  useEffect(() => {
   getSpecificProduct(id)
   getproducts(category)
  }, [id]) 
  
  return <>
  {isLodaing ?<div className='flex justify-center items-center h-screen'> <RingLoader color="#4fa94d" size={100}/></div> : 
  <>
  <div className="container mx-auto bg-white shadow-lg  rounded-lg overflow-hidden relative flex mt-3">
  <Link to={"/"} className='absolute top-7 end-5 text-3xl hover:text-[#4fa94d] transition-all hover:rotate-180 hover:-scale-125  duration-500 p-2'><RiCloseLargeLine  className=''/></Link>

  <div className="flex w-full flex-col justify-between items-center md:flex-row">
    <div className="md:w-1/3 p-4 relative ">


      <div className="col-span-4">
        {productDetails?.images?.length > 0 &&(
        <ReactImageGallery  showFullscreenButton={false} showPlayButton={false} items={productDetails?.images?.map((image)=>{return {original:image , thumbnail:image}})}/>
      )}

      </div>
    </div>
    <div className="md:w-2/3 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{productDetails?.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{productDetails?.description}</p>
      <div className="flex items-center mb-4">
        <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{productDetails?.ratingsAverage} ★</span>
        <span className="text-sm text-gray-500 ml-2">{productDetails?.ratingsQuantity} reviews</span>
      </div>

      {productDetails?.priceAfterDiscount ? 
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">{productDetails?.priceAfterDiscount} EGP</span>
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">{productDetails?.price} EGP</span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
            </div>
      :
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-900">{productDetails?.price} EGP</span>
        </div>
      </div>}


      <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
      <div className="flex space-x-4">
        <button onClick={()=>{addToWishlist(productDetails._id)}}  className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-[#00cc74] hover:bg-[#00C88C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
           <CiHeart className=''/> WishList
        </button>
        <button onClick={()=>{addToCartProduct(productDetails._id)}} className="cursor-pointer flex-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  </div>

  <h2 className='mt-10 font-bold w-fit  py-2 text-xl border-4 border-transparent border-b-green-600  px-2'>Related products :-</h2>
  <Swiper
    slidesPerView={1}
    spaceBetween={10}
    // autoplay={{
    //   delay: 1000,
    //   disableOnInteraction: false,
    // }}
    pagination={{
      clickable: true,
    }}
    breakpoints={{
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1250: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    }}
    modules={[Pagination 
      // , Autoplay
    ]}
    className="mySwiper"
  >
    
    {relatedProduct?.map((product)=>(
      <SwiperSlide>
        <div className="praent pb-9 pt-5 gap-4 grid ">
      <div className='curso r-pointer w-[220 px] max-h-[ 500px] overflow-hidden relative shadow-xl rounded-lg group/per' key={product._id}>
    
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


  </div>
</div>
</SwiperSlide>
))}
  
  </Swiper>
  </>
  }
  </>
}

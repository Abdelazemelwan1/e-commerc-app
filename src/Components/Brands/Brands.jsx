import React, { useEffect, useState } from 'react';
import Style from "./Brands.module.css"
import UseTitle from '../UseTitle/UseTitle';
import { useQuery } from '@tanstack/react-query';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';


export default function Brands() {
  UseTitle('Brands');
  let {data , isLoading,isError , error , isFetching} = useQuery({
    queryKey:["Branch"],
    queryFn:getAllBrancg,
    staleTime: 1000,
    gcTime:4000
  })

  async function getAllBrancg() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 
    
  }
  return <>
  
  <h2 className='mt-30 text-center border-b border-t py-2 text-[#00cc74]  text-lg'>Shop by Brand</h2>

  <div className="praent py-9 gap-4 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
    {data?.data.data.map((brand)=> <Link to={`/BrandsDetails/${brand._id}/${brand.name}`} key={brand._id} className='flex items-center justify-center'>
      <img className='size-30 sm:size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:translate-y-8 duration-500' src={brand.image} alt="" />
    </Link>)}
  </div>
  </>
  
}

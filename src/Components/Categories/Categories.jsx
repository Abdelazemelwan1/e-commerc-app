import React, { useEffect, useState } from 'react';
import Style from "./Categories.module.css"
import UseTitle from '../UseTitle/UseTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export default function Categories() {
    UseTitle('Categories');

    async function getAllCategories() {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let {data , isLoading } = useQuery({
      queryKey: ["Categories"],
      queryFn: getAllCategories,
    })

if (isLoading) {
    return <div className='flex justify-center items-center h-screen '> <RingLoader color="#4fa94d" size={100}/></div> 

    
  }
  return <>
  <h2 className='mt-30 text-center border-b border-t py-2 text-[#00cc74]  text-lg'>Shop by Categories</h2>
  <div className="praent py-9 gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {data?.data.data.map((Category)=>
      <div key={Category._id} className='grid gap-5'>
        <Link className='relative group inline-block mb-6 size-[150px] rounded-xl shadow-md cursor-pointer  p-1'  to={`/CategoriesDetails/${Category.name}`}>
          <img className="size-full object-cover rounded-xl group-hover:scale-[1.03] duration-500" src={Category.image} alt={Category.name} />
          <h2 className=' text-green-500  mt-3 font-semibold text-center'>{Category.name}</h2>
        </Link>
      </div>
    )}
  </div>
  </>
  
}

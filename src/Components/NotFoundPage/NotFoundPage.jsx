import React, { useEffect, useState } from 'react';
import Style from "./NotFoundPage.module.css"
import UseTitle from '../UseTitle/UseTitle';
import Not from '../../assets/error.svg'


export default function NotFoundPage() {
    UseTitle('NotFoundPage');
  return <>
  <div className='flex justify-center items-center pt-10'>

  <img src={Not} alt="" />
  </div>
  <h2 className='text-center text-4xl md:text-7xl pb-20 font-extrabold text-shadow-emerald-500 text-[#0AAD0A] font-serif'>NotFoundPage</h2>
  </>
  
}

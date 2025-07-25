import React, { useEffect, useState } from 'react';
import Style from "./Footer.module.css";
import AmazonLogo from '../../assets/amazon-pay.png'
import AmericanLogo from '../../assets/American-Express-Color.png'
import MesterLogo from '../../assets/mastercard.webp'
import paypalLogo from '../../assets/paypal.png';
import AppleLogo from '../../assets/get-apple-store.png';
import GoogleLogo from '../../assets/get-google-play.png';


export default function Footer() {

  return <>
  
  <footer className='xl:px-9 w-full bg-gray-200  py-9 mx-auto'>
    <div className="container mx-auto">

      <h2 className='capitalize text-2xl px-4 md:px-0'>get the freshCart app</h2>
      <p className='text-gray-400 px-4 md:px-0'>We will send you a link, open it on your phone to download the app.</p>
      <div className="flex  px-8 my-5 space-x-3">
      <div className="w-full">
        <input type="email" id="email" className="outline-none
        w-full
        shadow-xs
        bg-white
        border 
        border-gray-300
          text-gray-900 
          text-sm rounded-lg
          focus:ring-blue-500
            focus:border-blue-500
            block
              p-2.5 
              
              dark:border-gray-600
                dark:placeholder-gray-400 
                
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500 
                dark:shadow-xs-light" placeholder="Email..." />
      </div>
      <button type="button" className="xl:w-1/7 lg:w-1/5 md:w-1/4 sm:w-1/3 w-2/3 outline-none capitalize cursor-pointer  text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-2 py-1.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">share app link</button>
      </div>
      <hr className='text-gray-400 px-8' />

      <div className='py-5 px-8 flex flex-col lg:flex-row gap-y-3 items-center justify-between'>
        <div className='flex gap-3 items-center flex-col md:flex-row'>
          <h3 className='capitalize'>payment partners</h3>
          <div className='flex gap-3 items-center '>
          <img className='w-15' src={AmazonLogo} alt="" />
          <img className='w-15' src={paypalLogo} alt="" />
          <img className='w-15' src={MesterLogo} alt="" />
          <img className='w-15' src={AmericanLogo} alt="" />
          </div>
        </div>
        <div className='flex gap-3 items-center flex-col md:flex-row'>
          <h3 className='capitalize'>get delevries with fresh cart</h3>
          <div className='flex gap-3 items-center '>
            <img className='w-20' src={AppleLogo} alt="" />
            <img className='w-20' src={GoogleLogo} alt="" />
          </div>
        </div>
      </div>

      <hr className='text-gray-400 px-8' />
    </div>
  </footer>
  </>
  
}

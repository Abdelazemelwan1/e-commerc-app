import React, { useEffect, useState } from 'react';
import Style from "./Product.module.css"
import UseTitle from '../UseTitle/UseTitle';
import DisplayProducts from '../DesplayProducts/DisplayProducts';


export default function Product() {
    UseTitle('Product');

  return <>
    <div className='mt-20'>
      <DisplayProducts />
    </div>
  </>
  
}

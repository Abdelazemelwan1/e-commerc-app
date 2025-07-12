import React, { useEffect, useState } from 'react';
import Style from "./MainSlider.module.css"
import Slider from 'react-slick';
import slid1 from '../../assets/slider-2.jpeg'
import slid2 from '../../assets/product2-Cc8hawmZ.jpg'
import slid3 from '../../assets/product3-CjkhanyU.jpg'
import slid5 from '../../assets/product4-CxeAzYXu.jpg'
import slid4 from '../../assets/product5-DZxbnV6L.jpg'


export default function MainSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed:1000,
    autoplay:true,
    arrows: true
  };
  return <>
  <div className="flex flex-col lg:grid  lg:grid-cols-[2fr_1fr] mt-10">

    <Slider className='overflow-hidden mt-10 mb-0 inline-block' {...settings}>
      <div className='m-0 inline-block'>
        <img src={slid1} alt="" className='w-full h-[550px] object-cover mb-0 inline-block'/>
      </div>
      <div className='m-0'>
        <img src={slid2} alt=""  className='w-full h-[550px] object-cover mb-0 inline-block'/>
      </div>
      <div className='m-0'>
        <img src={slid3} alt="" className='w-full h-[550px] object-cover mb-0 inline-block' />
      </div>
    
    </Slider>
    <div className='lg:mt-10 w-full flex lg:block'>
      <img src={slid4} alt="" className='w-[45vw] lg:w-full h-[275px] '/>
      <img src={slid5} alt="" className='w-[45vw] lg:w-full h-[275px] '/>
    </div>
  </div>
  </>
  
}

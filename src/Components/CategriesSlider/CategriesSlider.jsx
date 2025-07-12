import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Style from "./CategriesSlider.module.css"
import axios from "axios";
// import { Slider } from 'react-slick';



export default function CategriesSlider() {
  const [Categories, setCategories] = useState(null)

  async function getCategories() {
    let {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data)
    
  }
  useEffect(() => {
    getCategories()
  }, [])
  
  var settings = {
    dots: true,
    infinite: true,
    
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplaySpeed:1000,
    autoplay:true,
    arrows: true,
     responsive: [
       {
        breakpoint: 1224,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
       {
        breakpoint: 1152,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]

    
  };

  return <>
<div  className='py-10' >

<Slider className='pb-3' {...settings}> 
  {Categories?.map((category)=> <div>
        <img className='w-100 h-[250px] object-cover' src={category.image} alt="" />
        <h5 className='text-center bg-gray-200 text-[#7BCF7C] py-1'>{category.name.split(" ",1).join(" ")}</h5>
      </div>
  )}
    </Slider>
  </div>
  </>
  
}

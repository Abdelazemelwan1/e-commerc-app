import React, { useEffect, useState } from 'react';
import Style from "./Home.module.css"
import UseTitle from '../UseTitle/UseTitle';
import DisplayProducts from '../DesplayProducts/DisplayProducts';
import { CiHeart } from 'react-icons/ci';
import CategriesSlider from '../CategriesSlider/CategriesSlider';
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {
    UseTitle('Home');

  return <>

<MainSlider />
<CategriesSlider/>
  <DisplayProducts />



  






  </>
  
}

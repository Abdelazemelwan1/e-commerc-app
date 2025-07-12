
import React, { useEffect, useState } from 'react';

import Swal from "sweetalert2";
import Style from "./Login.module.css"
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import UseTitle from '../UseTitle/UseTitle';
import { Eye, EyeClosed, EyeOff, UserRoundPen } from 'lucide-react';
import * as YUP from 'yup'
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { authContext } from './../../Context/AuthConTextProvider';
import { jwtDecode } from "jwt-decode";

export default function Login() {
    UseTitle('Login');
  let [isLodaing, setisLodaing] = useState()
  let [showPassword, setShowPassword] = useState("password")
  let {setToken , setIdUser} = useContext(authContext)
    let navigate = useNavigate()
  
  function toggleShowpass() {
    setShowPassword(showPassword === "password" ? "text" : "password")
  }


  function handeleLogin(value) {
    setisLodaing(true)
    let lodingToast = toast.loading("loading....")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value)
    .then((res)=>{
        setToken(res.data.token)
        localStorage.setItem("token" , res.data.token)
        let {id} = jwtDecode(res.data.token);
        localStorage.setItem("id" , id)
        setIdUser(id)
        toast.success(res.data.message)
        setTimeout(() => {
          
          navigate("/");
        }, 2000);
        
      })
    .catch((error)=>{
        toast.error(error.response.data.message)
    })
    .finally(()=>{
      setisLodaing(false)
      toast.dismiss(lodingToast)
    })
  }



let validationSchema = YUP.object().shape({
  email: YUP.string().email("email is in-valid").required("email is required"),
  password : YUP.string().matches(/^[a-zA-Z0-9_ @]{6,15}$/,"password min 6 to 15 letters").required("password is required"),

})

let regisertForm = useFormik({
  initialValues:{
    email:"",
    password:""
  },
  validationSchema,
  onSubmit:handeleLogin
})


return <>
    <form onSubmit={regisertForm.handleSubmit} className='lg:w-1/2 w-3/4 mx-auto my-9 py-1'>
    <h2 className='capitalize text-2xl md:text-3xl font-normal mb-4 mt-9 pt-8 ps-2 text-green-600 flex items-center justify-start gap-2'> <UserRoundPen /> Login now :</h2>
      <div className='mt-3 mb-0.5'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">email :</label>
        <input
        name='email'
        value={regisertForm.values.email}
        onChange={regisertForm.handleChange}
        onBlur={regisertForm.handleBlur}
        type="email" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {regisertForm.errors.email && regisertForm.touched.email ? <span className='text-red-700 bg-red-200 p-2 ps-3 rounded-xl w-full block'>{regisertForm.errors.email}</span> : null}
      <div className='mt-3 mb-0.5 relative'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Password :</label>
        <input
        name='password'
        value={regisertForm.values.password}
        onChange={regisertForm.handleChange}
        onBlur={regisertForm.handleBlur}
        type={showPassword} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <div onClick={toggleShowpass} className='absolute end-4 text-gray-900 top-[53%] cursor-pointer'>
          {showPassword === "password" ? <Eye /> : <EyeOff /> }
          
          
        </div>
      </div>
      {regisertForm.errors.password && regisertForm.touched.password ? <span className='text-red-700 bg-red-200 p-2 ps-3 rounded-xl w-full block'>{regisertForm.errors.password}</span> : null}
      <div className='flex-col md:flex-row flex items-center justify-between'>
      
      <p className='text-sm md:text-[16px] capitalize mt-3'> <Link className=" hover:text-green-800 capitalize" to="/ForgetPassword">forget your password ?</Link></p>
      <p className='text-sm md:text-[16px] capitalize mt-3'>Create a new account : <Link className="text-green-600 hover:text-green-800 capitalize" to="/register">register</Link></p>
      </div>
      <button  disabled={isLodaing ? true : false}  type="submit" className="outline-none block text-white bg-green-700 hover:bg-green-800   font-light rounded-lg text-xl px-5 py-2.5 ms-auto mb-2 mt-5 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer ">
        {isLodaing ? <span className="loader" /> : "Login" }
      </button>

    </form>
  </>
  
}


import React, { useEffect, useState } from 'react';
import Style from "./ResetPassword.module.css"
import UseTitle from '../UseTitle/UseTitle';
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from 'yup'
import toast from 'react-hot-toast';

export default function ResetPassword() {
    UseTitle('verify-code');

  let [isLodaing, setisLodaing] = useState()
    let navigated = useNavigate()
  
  function handeleLogin(value) {
    setisLodaing(true)

    let lodingToast = toast.loading("loading....")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",value)
    .then((res)=>{
        toast.success(res.data.message)
        setTimeout(() => {
          navigated("/ResetAccountPassword");
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
  resetCode: YUP.string().matches(/^[0-9]{5,6}$/, "resetCode is invalid").required("resetCode is required"),
})

let regisertForm = useFormik({
  initialValues:{
    resetCode:"",
  },
  validationSchema,
  onSubmit:handeleLogin
})

    
  return <>
  <form onSubmit={regisertForm.handleSubmit} className='lg:w-1/2 w-3/4 mx-auto my-9 py-1'>
    <h2 className='capitalize text-[14px] md:text-xl font-normal mb-4 mt-9 pt-8 ps-2 text-green-600 flex items-center justify-start gap-2'>Enter the code to be sent to the email :</h2>
      <div className='mt-3 mb-0.5'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Write code :</label>
        <input
        name='resetCode'
        value={regisertForm.values.resetCode}
        onChange={regisertForm.handleChange}
        onBlur={regisertForm.handleBlur}
        type="text" placeholder='code...'  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {regisertForm.errors.resetCode && regisertForm.touched.resetCode ? <span className='text-red-700 bg-red-200 p-2 ps-3 rounded-xl w-full block'>{regisertForm.errors.resetCode} </span> : null}
    
      <button  disabled={isLodaing ? true : false}  type="submit" className="outline-none block text-white bg-green-700 hover:bg-green-800   font-light rounded-lg text-xl px-5 py-2.5 ms-auto mb-2 mt-5 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer ">
        {isLodaing ? <span className="loader" /> : "verify" }
        
      </button>

    </form>  
  </>
  
}













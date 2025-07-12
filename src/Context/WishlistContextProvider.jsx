import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthConTextProvider';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export let WishListContext = createContext()

export default function WishlistContextProvider({children}) {
    const [products, setProducts] = useState(null)
    const [count, setCount] = useState(null) 
    const [isLodaing, setIsLodaing] = useState(null)
    const [length, setLength] = useState(null)
    let {token} = useContext(authContext);

    function addToWishlist(productId) {
        let lodingToast = toast.loading("looding........")
        axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},{
            headers: {
                token
            }
        })
        .then((res) => {
            // console.log(res);
             setProducts(res.data.data)
            setLength(res.data.data.length)

            //  setCount(res.data.count)
            toast.success("add to Wishlist !",{
                duration: 4000,
                removeDelay: 100
            })

        }).catch((error)=>{
            // console.log(error);
            
            toast.error("this is an error!")
            

        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
        
    }







    function getWishList() {
        setIsLodaing(false)
        axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token
            }
        }).then((res) => {
            console.log(res);
            setCount(res.data.count)
            setProducts(res.data.data);
            console.log(res.data.data);
            setLength(res.data.data.length)
            
        }).catch((err) => {
            console.log(err);
            
        }).finally(()=>{
            setIsLodaing(true)
        })
    
    }


      function removeWishListItem(id) {
       let lodingToast = toast.loading("looding........")
         axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token
            }
        })
        .then((res) => {
              setCount(res.data.count)
            setProducts(res.data.data)
            setLength(res.data.data.length)
            // getWishList()
            console.log(res);
            toast.success(res.data.message,{
                duration: 4000,
                removeDelay: 100
            })
            
        }).catch((err) => {
            console.log(err);
                toast.error(err.message)
            
        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }

// async function callApi(id) {
//    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
//             headers:{
//                 token
//             }
//         })
// }
//     let {data , isLoading , isError} = useQuery({
//         queryKey: ["WisList"],
//         queryFn:callApi
//     })




    // useEffect(()=>{
    //     removeWishListItem()
    // },[count])


  return <WishListContext.Provider value={{addToWishlist , getWishList , removeWishListItem, length , count , products , isLodaing}}>
    {children}
  </WishListContext.Provider>
}

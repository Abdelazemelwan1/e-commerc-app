import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import  axios  from 'axios';
import { authContext } from './AuthConTextProvider';
import { BrowserRouter, HashRouter, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export let cartContext = createContext(null)

export default function CartContextProvider({children}) {
    const [cartId, setCartid] = useState(null);
    const [products, setProducts] = useState(null);
    const [numofCart, setNumofCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    let {token} = useContext(authContext);
    const [isLodaing, setIsLodaing] = useState(false)


   

    async function addProductToCart(productId){
        let lodingToast = toast.loading("looding........")
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId
        },{
            headers:{
                token
            }
        })
        .then((res)=>{
            setNumofCart(res.data.numOfCartItems)
            return true
        })
        .catch((error)=>{
            return false
        })
        .finally(()=>{
            toast.dismiss(lodingToast)
        })
        
    }
    

    async function getLoggedUserCart(){
        setIsLodaing(true)
            await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token
                }
            })
            .then((res)=>{
                setProducts(res.data.data.products)
                setNumofCart(res.data.numOfCartItems)
                setTotalPrice(res.data.data.totalCartPrice)
                setCartid(res.data.cartId)
                
            })
            .catch(()=>{
                
            }).finally(()=>{
                setIsLodaing(false)
            })
            
        
        
    }
    
    async function removeItem(id) {
let lodingToast = toast.loading("looding........")
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers :{
                token
            }
        })
        .then((res)=>{
            setProducts(res.data.data.products)
            setNumofCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            return true

        }).catch(()=>{
            return false
        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }

    async function updataQuantityProduct(id,count) {
        let lodingToast = toast.loading("looding........")
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
            headers:{
                token
            }
        }).then((res)=>{
             setProducts(res.data.data.products)
            setNumofCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            return true
        }).catch(()=>{
            return false

        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }


    async function DeleteCart() {
        let lodingToast = toast.loading("looding........")
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token
            }
        }).then(()=>{
            setProducts([])
            setNumofCart(0)
            setTotalPrice(0)
            return true
        }).catch(()=>{
            return false

        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }

    async function cashOrder(valeus) {
    let shippingAddress={
      shippingAddress:valeus
    }
    let lodingToast = toast.loading("looding........")
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,{
      headers:{
        token:localStorage.getItem("token")
      }
    }).then(() => {
        setNumofCart(res.data.numOfCartItems)
        toast.success("order made successfully")
        return true
        
    }).catch(() => {
        toast.error("order made filld")
        return false
    
    }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }


    async function onlineOrder(valeus) {
        let lodingToast = toast.loading("looding........")
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,valeus,{
            headers:{
                token : localStorage.getItem("token")
            }
        }).then((res) => {
            toast.success("order made successfully")
            setTimeout(() => {
                window.open(res.data.session.url, "_self")
          
        }, 10000);
            setNumofCart(res.data.numOfCartItems)
            return true
        }).catch((error) => {
            toast.error("order made filld")
            return false
        
        }).finally(()=>{
            toast.dismiss(lodingToast)
        })
    }


    useEffect(()=>{
        getLoggedUserCart()
    },[])


  return (
    // <HashRouter>
    
    <cartContext.Provider value={{updataQuantityProduct,DeleteCart,cashOrder,onlineOrder,cartId,isLodaing,removeItem,addProductToCart,getLoggedUserCart,products,numofCart,totalPrice}}>
        {children}
    </cartContext.Provider>
    // </HashRouter>
  )
}

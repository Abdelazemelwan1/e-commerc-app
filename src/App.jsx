import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import { Toaster } from 'react-hot-toast';
import AuthConTextProvider from './Context/AuthConTextProvider';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ResetAccountPassword from './Components/ResetAccountPassword/ResetAccountPassword';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContextProvider';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import {QueryClient , QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import CategoriesDetails from './Components/CategoriesDetails/CategoriesDetails';
import WishlistContextProvider from './Context/WishlistContextProvider';
import WishList from './Components/WishList/WishList';



let client = new QueryClient()
function App() {
  // let navigate = useNavigate();
  let router = createBrowserRouter([
    {path:"" , element:<Layout /> , children: [
      {path: "" , element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path: "Product" , element:<ProtectedRoute><Product /></ProtectedRoute>},
      {path: "Payment" , element:<ProtectedRoute><Payment /></ProtectedRoute>},
      {path: "allorders" , element:<ProtectedRoute><AllOrders /></ProtectedRoute>},
      {path: "ProductDetails/:id/:category" , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: "cart" , element:<ProtectedRoute><Cart /></ProtectedRoute>},
      {path: "Categories" , element:<ProtectedRoute><Categories /></ProtectedRoute>},
      {path: "CategoriesDetails/:nameCategoris" , element:<ProtectedRoute><CategoriesDetails /></ProtectedRoute>},
      {path: "WishList" , element:<ProtectedRoute><WishList /></ProtectedRoute>},
      {path: "Brands" , element:<ProtectedRoute><Brands /></ProtectedRoute>},
      {path: "BrandsDetails/:id/:nameBrand" , element:<ProtectedRoute><BrandsDetails /></ProtectedRoute>},
      {path: "ForgetPassword" , element:<ForgetPassword />},
      {path: "ResetPassword" , element:<ResetPassword />},
      {path: "ResetAccountPassword" , element:<ResetAccountPassword />},
      {path: "login" , element:<Login />},
      {path: "register" , element:<Register />},
      {path: "*" , element:<ProtectedRoute><NotFoundPage /></ProtectedRoute>},

    ]}
  ])

  return (
    <>
    {/* <BrowserRouter> */}
    <QueryClientProvider client={client}>

    <AuthConTextProvider>
      <CartContextProvider>
        <WishlistContextProvider>

        <ReactQueryDevtools/>
        <RouterProvider router={router}/>
        <Toaster />

        </WishlistContextProvider>
      </CartContextProvider>
    </AuthConTextProvider>

    </QueryClientProvider>

    
    {/* </BrowserRouter> */}
    </>
  )
}

export default App

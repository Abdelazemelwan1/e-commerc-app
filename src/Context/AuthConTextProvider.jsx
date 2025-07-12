import React, { createContext } from 'react'
import { useState } from 'react'


export let authContext = createContext()

export default function AuthConTextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [idUser, setIdUser] = useState(localStorage.getItem("id"))

  return <authContext.Provider value={{token , idUser , setIdUser , setToken}}>
        {children}
  </authContext.Provider>
}

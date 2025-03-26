"use client"

import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'


const LoggedUserContext = createContext();



export const LoggedProvider = ({ children }) => {
    const [pd, setPd] = useState("");
    const [name, setName] = useState("")
  
  
  return (
    <LoggedUserContext.Provider value={{ pd, setPd, name, setName }}>
      { children }
    </LoggedUserContext.Provider>
  )
}


export const useLoggedUser = () => useContext(LoggedUserContext);
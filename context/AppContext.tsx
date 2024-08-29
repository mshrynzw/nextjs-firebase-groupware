"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"

type AppContextType = {
  screen : string;
  setScreen : (screen : string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen]=useState<string>("find")

   return (
    <AppContext.Provider value={{ screen, setScreen}}>
      {children}
    </AppContext.Provider>
  )
}

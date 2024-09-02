"use client"

import React, { createContext, useState, ReactNode } from "react"
import info from "@/types/info"

type InfoContextType = {
  infos : info[];
  setInfos : (infos : info[]) => void;
}

export const InfoContext = createContext<InfoContextType | undefined>(undefined)

export const InfoProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [infos, setInfos] = useState<info[]>([])

  return (
    <InfoContext.Provider value={{ infos, setInfos }}>
      {children}
    </InfoContext.Provider>
  )
}

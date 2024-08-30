"use client"

import React, { createContext, useState, ReactNode } from "react"
import group from "@/types/group"

type GroupContextType = {
  groups : group[];
  setGroups : (groups : group[]) => void;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined)

export const GroupProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<group[]>([])

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  )
}

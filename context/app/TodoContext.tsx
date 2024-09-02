"use client"

import React, { createContext, useState, ReactNode } from "react"
import todo from "@/types/todo"

type TodoContextType = {
  todos : todo[];
  setTodos : (todos : todo[]) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<todo[]>([])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

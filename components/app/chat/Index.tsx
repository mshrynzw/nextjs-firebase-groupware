"use client"

import React from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

const DynamicFind = dynamic(() => import("./Find"))
const DynamicCreate = dynamic(() => import("./Create"))
const DynamicSidebar = dynamic(() => import("./Sidebar"))


const Index : React.FC = () => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity : 0 }}
        animate={{ opacity : 1 }}
        exit={{ opacity : 0 }}
        transition={{ duration : 0.5 }}
      >
        <div className="xl:mr-64">
          <div className="mb-24 space-y-4">
            <DynamicFind/>
          </div>
          <DynamicCreate/>
        </div>
        <DynamicSidebar/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Index
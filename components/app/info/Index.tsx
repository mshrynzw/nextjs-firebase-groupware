"use client"

import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"

const DynamicFind = dynamic(() => import("./Find"))
const DynamicContainer = dynamic(() => import("@/components/container/Container"))
const DynamicEdit = dynamic(() => import("./Edit"))
const DynamicDelete = dynamic(() => import("./Delete"))
const DynamicCreate = dynamic(() => import("./Create"))
const DynamicButtonMenu = dynamic(() => import("@/components/button/ButtonMenu"))

const Index : React.FC = () => {
  const pathName = usePathname()
  const { screen } = useContext(AppContext)

  const [editInfo, setEditInfo] = useState(null)
  const [deleteInfo, setDeleteInfo] = useState(null)
  const [type, setType] = useState("plain")
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (editInfo) setType(editInfo.type)
  }, [editInfo])

  const handleType = (str : string) => {
    setType(str)
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathName}
          initial={{ opacity : 0 }}
          animate={{ opacity : 1 }}
          exit={{ opacity : 0 }}
          transition={{ duration : 0.5 }}
        >
          <DynamicFind setEditInfo={setEditInfo} setDeleteInfo={setDeleteInfo}/>
          {screen !== "find" && (
            <DynamicContainer>
              {screen === "edit" && editInfo !== null ? (
                <DynamicEdit editInfo={editInfo} handlePreview={handlePreview} isPreview={isPreview} type={type}/>
              ) : screen === "delete" && deleteInfo !== null ? (
                <DynamicDelete deleteInfo={deleteInfo}/>
              ) : screen === "create" ? (
                <DynamicCreate type={type} isPreview={isPreview} handlePreview={handlePreview}/>
              ) : null}
            </DynamicContainer>
          )}
          <DynamicButtonMenu handlePreview={handlePreview} handleType={handleType} isPreview={isPreview} type={type}/>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Index
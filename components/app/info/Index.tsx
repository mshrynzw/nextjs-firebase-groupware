"use client"

import React, { useContext, useEffect, useState } from "react"
import Find from "@/components/app/info/Find"
import Container from "@/components/container/Container"
import Edit from "@/components/app/info/Edit"
import Delete from "@/components/app/info/Delete"
import Create from "@/components/app/info/Create"
import ButtonMenu from "@/components/button/ButtonMenu"
import { AppContext } from "@/context/AppContext"

const Index : React.FC = () => {
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
      <Find setEditInfo={setEditInfo} setDeleteInfo={setDeleteInfo}/>
      {screen !== "find" && (
        <Container>
          {screen === "edit" && editInfo !== null ? (
            <Edit editInfo={editInfo} handlePreview={handlePreview} isPreview={isPreview} type={type}/>
          ) : screen === "delete" && deleteInfo !== null ? (
            <Delete deleteInfo={deleteInfo}/>
          ) : screen === "create" ? (
            <Create type={type} isPreview={isPreview} handlePreview={handlePreview}/>
          ) : null}
        </Container>
      )}
      <ButtonMenu handlePreview={handlePreview} handleType={handleType} isPreview={isPreview} type={type}/>
    </>
  )
}

export default Index
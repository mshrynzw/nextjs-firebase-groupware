import React, { useContext } from "react"
import { deletedSchedule } from "@/lib/app/schedule"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import ButtonSubmit from "@/components/button/ButtonSubmit"


const Delete = ({ deleteSchedule, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const handleDelete = async () => {
    await deletedSchedule(Number(deleteSchedule.event.id))
    setScreen("find")
    refetch()
  }

  return (
    <div>
      <LabelHeader screen="delete"/>
      <ButtonSubmit onClick={handleDelete}/>
    </div>
  )
}

export default Delete

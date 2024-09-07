import React, { useContext } from "react"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import Label from "@/components/label/Label"
import LabelHeader from "@/components/label/LabelHeader"
import { TimecardContext } from "@/context/app/TimecardContext"
import { AppContext } from "@/context/AppContext"
import { deletedTimecard } from "@/lib/app/timecard"
import { formatTime } from "@/lib/datetime"

const Delete : React.FC = ({ deleteTimecard }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)

  const handleDelete = async (e) => {
    e.preventDefault()
    await deletedTimecard(deleteTimecard.id)
    setTimecards((prevTimecards) => prevTimecards.filter(timecard => timecard.id !== deleteTimecard.id))
    setScreen("find")
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <div className="flex flex-row">
        <div className="flex basis-1/2 flex-col">
          <Label name="date"/>
          <p
            className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
            {new Date(deleteTimecard.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex basis-1/2 flex-col">
          <Label name="type"/>
          <p
            className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
            {deleteTimecard.settingTimecard.title}
          </p>
        </div>
      </div>

      <Label name="startWork"/>
      <p
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
        {formatTime(deleteTimecard.startWork)}
      </p>

      <Label name="startBreak"/>
      <p
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
        {formatTime(deleteTimecard.startBreak)}
      </p>

      <Label name="endBreak"/>
      <p
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
        {formatTime(deleteTimecard.endBreak)}
      </p>

      <Label name="endBreak"/>
      <p
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring">
        {formatTime(deleteTimecard.endWork)}
      </p>

      <ButtonSubmit onClick={handleDelete}/>
    </ContainerCentered>
  )
}

export default Delete

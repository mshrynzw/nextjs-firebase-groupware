import { editAction } from "@/actions/app/infoAction"
import Loading from "@/app/loading"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import LabelHeader from "@/components/label/LabelHeader"
import { TimecardContext } from "@/context/app/TimecardContext"
import { AppContext } from "@/context/AppContext"
import React, { useState, useEffect, useContext } from "react"
import { SettingTimecard } from "@/types/setting/timecard"
import { editedTimecard } from "@/lib/app/timecard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { formatDate, formatDateTimeMinute } from "@/lib/datetime"

const Edit : React.FC = ({ editTimecard }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)

  const [date, setDate] = useState<string>(editTimecard.date)
  const [timecardSetting, setTimecardSetting] = useState<SettingTimecard>(editTimecard.settingTimecard)
  const [startWork, setStartWork] = useState<string>(formatDateTimeMinute(editTimecard.startWork))
  const [startBreak, setStartBreak] = useState<string>(formatDateTimeMinute(editTimecard.startBreak))
  const [endBreak, setEndBreak] = useState<string>(formatDateTimeMinute(editTimecard.endBreak))
  const [endWork, setEndWork] = useState<string>(formatDateTimeMinute(editTimecard.endWork))

  // useEffect(() => {
  //   setStartWork(new Date(editTimecard.startWork).toISOString().slice(0, 16))
  //   setStartBreak(new Date(editTimecard.startBreak).toISOString().slice(0, 16))
  //   setEndBreak(new Date(editTimecard.endBreak).toISOString().slice(0, 16))
  //   setEndWork(new Date(editTimecard.endWork).toISOString().slice(0, 16))
  // }, [editTimecard])

  // const { loading, error, data } = useQuery(query)

  const [settingTimecards, setSettingTimecards] = useState<SettingTimecard[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettingTimecards = async () => {
      try {
        const response = await fetch("/api/setting/getTimecards", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        setSettingTimecards(data)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSettingTimecards()
  }, [])

  useEffect(() => {
    if (timecardSetting?.order > 0) {
      setStartWork("")
      setStartBreak("")
      setEndBreak("")
      setEndWork("")
    } else {
      setStartWork(formatDateTimeMinute(editTimecard.startWork))
      setStartBreak(formatDateTimeMinute(editTimecard.startBreak))
      setEndBreak(formatDateTimeMinute(editTimecard.endBreak))
      setEndWork(formatDateTimeMinute(editTimecard.endWork))
    }
  }, [timecardSetting])

  const handleSubmit = async () => {
    const updateTimecard = await editedTimecard(
      editTimecard.id, timecardSetting, startWork, startBreak, endBreak, endWork
    )
    setScreen("find")
    setTimecards((prevTimecards) =>
      prevTimecards.map(timecard =>
        timecard.id === updateTimecard.id
          ? { ...timecard, ...updateTimecard }
          : timecard
      )
    )
    setScreen("find")
  }

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  return (
    <ContainerCentered>
      <LabelHeader screen="edit"/>
      <Form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit()
        }}
      >
        <div className="flex flex-row">
          <div className="flex basis-1/2 flex-col">
            <Label name="date"/>
            <input
              type="date" name="date" id="date" value={date}
              className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex basis-1/2 flex-col">
            <Label name="type"/>
            <select
              name="type" id="type" value={timecardSetting?.title}
              className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              onChange={(e) => {
                const selectedType = settingTimecards.find(setting => setting.title === e.target.value)
                setTimecardSetting(selectedType)
              }}
            >
              {[...settingTimecards]
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((timecardSetting) => (
                <option key={timecardSetting.id} value={timecardSetting.title}>
                  {timecardSetting.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Label name="startWork"/>
        <input
          type="datetime-local" name="startWork" id="startWork" value={startWork}
          className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          onChange={(e) => setStartWork(e.target.value)}
        />

        <Label name="startBreak"/>
        <input
          type="datetime-local" name="startBreak" id="startBreak" value={startBreak}
          className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          onChange={(e) => setStartBreak(e.target.value)}
        />

        <Label name="endBreak"/>
        <input
          type="datetime-local" name="endBreak" id="endBreak" value={endBreak}
          className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          onChange={(e) => setEndBreak(e.target.value)}
        />

        <Label name="endWork"/>
        <input
          type="datetime-local" name="endWork" id="endWork" value={endWork}
          className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          onChange={(e) => setEndWork(e.target.value)}
        />

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
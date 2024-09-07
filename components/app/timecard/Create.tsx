import React, { useContext, useState, useEffect } from "react"
import Loading from "@/app/loading"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import Form from "@/components/form/Form"
import ContainerCentered from "@/components/container/ContainerCentered"
import Label from "@/components/label/Label"
import LabelHeader from "@/components/label/LabelHeader"
import { AppContext } from "@/context/AppContext"
import { TimecardContext } from "@/context/app/TimecardContext"
import Cookies from "js-cookie"
import { formatDate } from "@/lib/datetime"
import { createdTimecard } from "@/lib/app/timecard"
import { SettingTimecard } from "@/types/setting/timecard"

const Create : React.FC = ({ createDate }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)
  const uid = Cookies.get("uid")

  // TODO 時間が固定値
  const formattedDate = formatDate(createDate)
  const initStartWork = formattedDate + "T09:00:00"
  const initStartBreak = formattedDate + "T12:00:00"
  const initEndBreak = formattedDate + "T13:00:00"
  const initEndWork = formattedDate + "T18:00:00"

  const [settingTimecards, setSettingTimecards] = useState<SettingTimecard[]>([])

  const [date, setDate] = useState<string>(formattedDate)
  const [settingTimecard, setSettingTimecard] = useState<SettingTimecard>()
  const [startWork, setStartWork] = useState<string>(initStartWork)
  const [startBreak, setStartBreak] = useState<string>(initStartBreak)
  const [endBreak, setEndBreak] = useState<string>(initEndBreak)
  const [endWork, setEndWork] = useState<string>(initEndWork)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettingTimecards = async () => {
      try {
        const response = await fetch("/api/setting/getTimecards", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        await setSettingTimecards(data)
        await setSettingTimecard(settingTimecards[0])
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
    if (settingTimecard?.order > 0) {
      setStartWork("")
      setStartBreak("")
      setEndBreak("")
      setEndWork("")
    } else {
      setStartWork(initStartWork)
      setStartBreak(initStartBreak)
      setEndBreak(initEndBreak)
      setEndWork(initEndWork)
    }
  }, [settingTimecard])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newTimecard = await createdTimecard(uid, date, settingTimecard, startWork, startBreak, endBreak, endWork)
      setScreen("find")
      setTimecards((prevTimecards) => [...prevTimecards, newTimecard])
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleSubmit}>
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
              name="type" id="type" value={settingTimecard?.title}
              className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              onChange={(e) => {
                const selectedTitle = e.target.value;
                const selectedTimecard = settingTimecards.find(tc => tc.title === selectedTitle) || null;
                setSettingTimecard(selectedTimecard);
              }}
            >
              {[...settingTimecards]
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((settingTimecard) => (
                <option key={settingTimecard.id} value={settingTimecard.title}>
                  {settingTimecard.title}
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

export default Create
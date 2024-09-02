import React, { useContext, useState } from "react"
import { createAction } from "@/actions/app/setting/timecardAction"
import ContainerCentered from "@/components/container/ContainerCentered"
import LabelHeader from "@/components/label/LabelHeader"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import InputDescription from "@/components/input/InputDescription"
import InputNumber from "@/components/input/InputNumber"
import InputColor from "@/components/input/InputColor"
import { AppContext } from "@/context/AppContext"
import { TimecardContext } from "@/context/app/setting/TimecardContext"

const Create : React.FC = ({ refetch }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [order, setOrder] = useState<number>(0)
  const [color, setColor] = useState<string>("#FFFFFF")

  const formAction = async (e) => {
    const formData = new FormData(e.currentTarget)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("order", order)
    formData.append("color", color)

    try {
      const newTimecard = await createAction(formData)
      setTimecards((prevTimecards) => [...prevTimecards, newTimecard])
      setScreen("find")
    } catch (error) {
      console.error(error)
    }
  }

  // TODO
  // const { loading, error, data } = useQuery(GET_ORDER)
  //
  // if (loading) return <p>Loading...</p>
  // if (error) {
  //   console.error("Error fetching messages:", error)
  //   return <p>Error: {error.message}</p>
  // }
  // let max = 1
  // const min = 0
  // if (data) {
  //   max += Math.max(...data.timecardSettings.data.map(setting => setting.attributes.order))
  // }

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form action={formAction}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Label name="description"/>
        <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>
        <div className="mb-8 flex space-x-4">
          <div className="basis-1/2">
            <Label name="order"/>
            <InputNumber value={Number(order)} onChange={(e) => setOrder(Number(e.target.value))}/>
          </div>
          <div className="basis-1/2">
            <Label name="color"/>
            <InputColor name="color" value={color} onChange={(e) => setColor(e.target.value)}/>
          </div>
        </div>
        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Create

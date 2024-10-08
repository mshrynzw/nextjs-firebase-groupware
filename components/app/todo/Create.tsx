import React, { useContext, useState } from "react"
import Cookies from "js-cookie"
import { createAction } from "@/actions/app/todoAction"
import ContainerCentered from "@/components/container/ContainerCentered"
import LabelHeader from "@/components/label/LabelHeader"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputDescription from "@/components/input/InputDescription"
import InputNumber from "@/components/input/InputNumber"
import InputDate from "@/components/input/InputDate"
import InputCheck from "@/components/input/InputCheck"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import { TodoContext } from "@/context/app/TodoContext"
import { AppContext } from "@/context/AppContext"
import { getNow } from "@/lib/datetime"

const Create : React.FC = () => {
  const { setScreen, user } = useContext(AppContext)
  const { setTodos } = useContext(TodoContext)

  const uid = Cookies.get("uid")

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [priority, setPriority] = useState<number>(3)
  const [due, setDue] = useState<string>(getNow())
  const [check, setCheck] = useState<boolean>(false)

  const formAction = async (e) => {
    const formData = new FormData(e.currentTarget)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("priority", priority)
    formData.append("due", due)
    formData.append("check", check)

    try {
      const newTodo = await createAction(formData, uid)
      setTodos((prevTodos) => [...prevTodos, newTodo])
      setScreen("find")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form action={formAction}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Label name="description"/>
        <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>

        <div className="md:space-x-4 md:flex md:flex-row">
          <div className="flex basis-1/3 flex-col">
            <Label name="priority"/>
            <InputNumber value={priority} min={1} max={5} onChange={(e) => setPriority(Number(e.target.value))}/>
          </div>

          <div className="flex flex-col md:basis-1/3">
            <Label name="due"/>
            <div className="flex md:justify-center">
              <InputDate name="due" value={due} onChange={(e) => setDue(e.target.value)}/>
            </div>
          </div>

          <div className="flex flex-col md:basis-1/3">
            <Label name="check"/>
            <div className="mb-8 flex h-full md:justify-center">
              <InputCheck name="check" value={check} onChange={(e) => setCheck(e.target.checked)}/>
            </div>
          </div>
        </div>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Create
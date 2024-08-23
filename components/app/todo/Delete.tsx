import { deletedTodo } from "@/lib/api/todo"
import { formatDateTimeByStrapi } from "@/lib/datetime"
import React, { useContext } from "react"
import LabelHeader from "@/components/label/LabelHeader"
import ContainerCentered from "@/components/container/ContainerCentered"
import Label from "@/components/label/Label"
import Paragraph from "@/components/paragraph/Paragraph"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import InputDisable from "@/components/input/InputDisabled"
import { AppContext } from "@/context/AppContext"

const Delete = ({ deleteTodo, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const handleDelete = async () => {
    await deletedTodo(deleteTodo.id)
    setScreen("find")
    refetch()
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteTodo.attributes.title}</Paragraph>
      <Label name="description"/>
      <Paragraph>{deleteTodo.attributes.description}</Paragraph>

      <div className="md:space-x-4 md:flex md:flex-row">
        <div className="flex basis-1/3 flex-col">
          <Label name="priority"/>
          <div className="flex md:justify-center">
            <InputDisable type="number" name="priority" value={String(deleteTodo.attributes.priority)}/>
          </div>
        </div>
        <div className="flex flex-col md:basis-1/3">
          <Label name="due"/>
          <div className="flex md:justify-center">
            <InputDisable type="datetime-local" name="due" value={formatDateTimeByStrapi(deleteTodo.attributes.due)}/>
          </div>
        </div>
        <div className="flex flex-col md:basis-1/3">
          <Label name="check"/>
          <div className="mb-8 flex h-full md:justify-center">
            <input type="checkbox" name="check" id="check" checked={deleteTodo.attributes.check}
                   className="h-6 w-6 scale-150 rounded border-0 shadow focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0"
                   disabled={true}
            />
          </div>
        </div>
      </div>

      <ButtonSubmit onClick={handleDelete}/>.
    </ContainerCentered>
  )
}

export default Delete

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faFont, faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faMarkdown } from "@fortawesome/free-brands-svg-icons"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import Cookies from "js-cookie"

const ButtonMenu = ({ handlePreview, handleType, isPreview, type }) => {
  const app = Cookies.get("app")
  const { screen, setScreen } = useContext(AppContext)

  return (
    <div className="fixed right-0 bottom-2 left-0 flex justify-center p-2 space-x-2 md:ml-64">
      {(app === "info" && (screen === "create" || screen === "edit")) && (
        <>
          <button
            title="Plain Text"
            className={`font-semibold p-2 text-sm bg-gray-200 text-blueGray-600 rounded-md shadow-xl hover:-translate-y-1 hover:text-blueGray-200 hover:scale-110 hover:bg-blueGray-600 ease-in-out duration-300 ${type === "plain" && "border-4 border-blueGray-400"}`}
            onClick={() => handleType("plain")}
          >
            <FontAwesomeIcon icon={faFont} className="h-8 w-8"/>
          </button>
          <button
            title="Markdown"
            className={`font-semibold p-2 text-sm bg-gray-200 text-blueGray-600 rounded-md shadow-xl hover:-translate-y-1 hover:text-blueGray-200 hover:scale-110 hover:bg-blueGray-600 ease-in-out duration-300 ${type === "markdown" && "border-4 border-blueGray-400"}`}
            onClick={() => handleType("markdown")}
          >
            <FontAwesomeIcon icon={faMarkdown} className="h-8 w-8"/>
          </button>
          <button
            title="TextPreview"
            className={`font-semibold p-2 text-sm bg-gray-200 text-blueGray-600 rounded-md shadow-xl hover:-translate-y-1 hover:text-blueGray-200 hover:scale-110 hover:bg-blueGray-600 ease-in-out duration-300 ${isPreview && "border-4 border-blueGray-400"}`}
            onClick={handlePreview}
          >
            <FontAwesomeIcon icon={faEye} className="h-8 w-8"/>
          </button>
        </>
      )}

      {screen === "find" ? (
        <button
          title="Return"
          className="rounded-md bg-gray-200 p-2 text-sm font-semibold shadow-xl duration-300 ease-in-out text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110"
          onClick={() => setScreen("create")}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="h-8 w-8"/>
        </button>
      ) : (
        <button
          title="Return"
          className="rounded-md bg-gray-200 p-2 text-sm font-semibold shadow-xl duration-300 ease-in-out text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110"
          onClick={() => setScreen("find")}
        >
          <FontAwesomeIcon icon={faHouse} className="h-8 w-8"/>
        </button>
      )}
    </div>
  )
}

export default ButtonMenu
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import Sidebar from "@/components/Sidebar"

const Layout = ({ children } : { children : React.ReactNode }) => {
  const { user } = useContext(AppContext)

  if (user) {
    return (
      <>
        <Sidebar/>
        <div className="relative bg-blueGray-50 md:ml-64">
          <main className="min-h-screen w-full p-4 md:p-12">
            {children}
          </main>
        </div>
      </>
    )
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    )
  }
}

export default Layout
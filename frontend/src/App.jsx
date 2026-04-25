import { Outlet } from "react-router"
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
       <div className='min-h-screen flex flex-wrap content-between'>
        <div className='w-full block'>
          <Navbar />
          <main >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default App

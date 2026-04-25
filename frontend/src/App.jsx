import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUser, login } from "./api/services/auth.service"

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const isUserLoggedIn = async ()=>{
      try {
        const data = await getUser()
        console.log("Response from getUser in App.jsx: ", data)
        dispatch(login(data))
      } catch (error) {
        console.error("Error fetching user data: ", error)
      }
    }

    isUserLoggedIn()
  }, [])

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

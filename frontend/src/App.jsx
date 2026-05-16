import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from "./api/services/auth.service"
import { login } from "./features/auth/authSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const isUserLoggedIn = async ()=>{
      try {
        const data = await getUser()
        if(data && data.user) { 
        dispatch(login(data.user))
        }
      } catch (error) {
        throw error
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

import { Outlet } from "react-router"


function App() {

  return (
    <>
      <div className='min-h-screen flex flex-wrap content-between'>
        <div className='w-full block bg-amber-900 text-white p-6 text-center text-3xl font-bold'>
          <main >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default App

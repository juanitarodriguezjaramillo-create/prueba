import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <ToastContainer />
    </>
  )
}

export default MainLayout
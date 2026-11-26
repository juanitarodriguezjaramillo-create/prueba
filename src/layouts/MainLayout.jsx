import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'

const MainLayout = () => (
  <div className="min-h-screen bg-paper text-ink-900">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Outlet />
    </main>
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
)

export default MainLayout

import { NavLink } from 'react-router'

const linkClass = ({ isActive }) =>
  isActive
    ? 'rounded px-3 py-2 bg-amber-700 text-white'
    : 'rounded px-3 py-2 text-stone-200 hover:bg-stone-700'

const Navbar = () => {
  return (
    <nav className="bg-stone-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <span className="text-xl font-bold text-amber-400">Universos de Tinta</span>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>Inicio</NavLink>
          <NavLink to="/authors" className={linkClass}>Autores</NavLink>
          <NavLink to="/add-author" className={linkClass}>Agregar autor</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
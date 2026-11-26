
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className="bg-[#3B2418] px-6 py-4 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">

        {/* Título que regresa al inicio */}
        <Link
          to="/"
          className="text-2xl font-bold text-amber-200 transition hover:text-white"
        >
          Universos de Tinta
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className="transition hover:text-amber-300"
          >
            Inicio
          </NavLink>

          <NavLink
            to="/authors"
            className="transition hover:text-amber-300"
          >
            Autores
          </NavLink>

          <NavLink
            to="/add-author"
            className="transition hover:text-amber-300"
          >
            Agregar autor
          </NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Navbar

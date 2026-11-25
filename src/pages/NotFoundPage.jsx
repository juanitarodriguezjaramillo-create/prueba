import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="my-4 text-lg">La página que buscas no existe.</p>
      <Link to="/" className="rounded bg-stone-900 px-4 py-2 text-white">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage
import { Link, useRouteError } from 'react-router'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold">Algo salió mal</h1>
      <p className="my-4 text-lg">{error?.message ?? 'Ocurrió un error inesperado.'}</p>
      <Link to="/authors" className="rounded bg-stone-900 px-4 py-2 text-white">
        Volver al listado
      </Link>
    </section>
  )
}

export default ErrorPage
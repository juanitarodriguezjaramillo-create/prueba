
import { Link } from 'react-router'
import Hero from '../components/Hero'
import Card from '../components/Card'
import AuthorCard from '../components/AuthorCard'
import Spinner from '../components/Spinner'
import { useAuthors } from '../hooks/useAuthors'

const HomePage = () => {
  const { authors, loading, error, toggleFavorite } = useAuthors()
  const latestAuthors = authors.slice(0, 3)

  return (
    <>
      <title>Universos de Tinta</title>
      <meta
        name="description"
        content="Explora autores de todo el mundo y sus obras."
      />

      <section className="my-8 text-center">
        <h1 className="font-display text-4xl font-bold text-ink-900">
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
          Un espacio donde las historias cobran vida, los autores dejan huella
          y cada libro abre un nuevo universo.
        </p>
      </section>

      <Hero />

      <section className="my-8 grid gap-6 md:grid-cols-2">
        <Card bg="bg-ink-100">
          <h2 className="font-display text-2xl">Para curiosos</h2>
          <p className="my-3">
            Explora autores, filtra por género y descubre sus obras.
          </p>
          <Link to="/authors" className="font-medium text-seal underline">
            Explorar autores
          </Link>
        </Card>

        <Card bg="bg-white">
          <h2 className="font-display text-2xl">Para lectores</h2>
          <p className="my-3">
            ¿Falta tu autor favorito? Agrégalo al catálogo.
          </p>
          <Link to="/add-author" className="font-medium text-seal underline">
            Agregar un autor
          </Link>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl">
          Últimos autores agregados
        </h2>

        {loading && <Spinner />}

        {error && (
          <p className="rounded-xl bg-white p-6 text-seal">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestAuthors.map((author) => (
              <AuthorCard
                key={author.id}
                author={author}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/authors"
            className="rounded-lg bg-ink-900 px-6 py-3 font-medium text-white hover:bg-ink-700"
          >
            Ver todos
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage

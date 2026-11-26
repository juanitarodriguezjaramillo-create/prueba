import { Link } from 'react-router'
import AuthorCard from '../components/AuthorCard'
import Spinner from '../components/Spinner'
import { useAuthors } from '../hooks/useAuthors'

const FavoritesPage = () => {
  const { authors, loading, error, toggleFavorite } = useAuthors()
  const favorites = authors.filter((author) => author.favorite)

  return (
    <>
      <title>Favoritos | Universos de Tinta</title>
      <h1 className="mb-6 font-display text-4xl">Favoritos</h1>
      {loading && <Spinner />}
      {error && <p className="rounded-xl bg-white p-6 text-seal">{error}</p>}
      {!loading && !error && favorites.length === 0 && (
        <p className="rounded-xl bg-white p-6 text-center">
          Aún no tienes favoritos. Toca el corazón de un autor en{' '}
          <Link to="/authors" className="text-seal underline">
            la lista de autores
          </Link>
          .
        </p>
      )}
      {!loading && !error && favorites.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((author) => (
            <AuthorCard key={author.id} author={author} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </>
  )
}

export default FavoritesPage
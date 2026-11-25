import AuthorList from '../components/AuthorList'
import Spinner from '../components/Spinner'
import { useAuthors } from '../hooks/useAuthors'

const AuthorsPage = () => {
  const { authors, loading, error, toggleFavorite } = useAuthors()

  return (
    <>
      <title>Autores | Universos de Tinta</title>
      <h1 className="mb-6 font-display text-4xl">Autores</h1>
      {loading && <Spinner />}
      {error && <p className="rounded-xl bg-white p-6 text-seal">{error}</p>}
      {!loading && !error && (
        <AuthorList authors={authors} onToggleFavorite={toggleFavorite} />
      )}
    </>
  )
}

export default AuthorsPage
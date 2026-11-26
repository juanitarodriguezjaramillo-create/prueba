import { Link, useLoaderData, useNavigate, useRevalidator } from 'react-router'
import { toast } from 'react-toastify'
import FavoriteButton from '../components/FavoriteButton'
import AuthorPhoto from '../components/AuthorPhoto'
import PhotoUrlForm from '../components/PhotoUrlForm'
import { deleteAuthor, patchAuthor } from '../services/authorsApi'

const AuthorDetailPage = () => {
  const author = useLoaderData()
  const navigate = useNavigate()
  const revalidator = useRevalidator()

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este autor?')) return

    try {
      await deleteAuthor(author.id)
      toast.success('Se eliminó el autor')
      navigate('/authors')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleToggleFavorite = async () => {
    try {
      await patchAuthor(author.id, { favorite: !author.favorite })
      await revalidator.revalidate()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSavePhoto = async (photo) => {
    try {
      await patchAuthor(author.id, { photo })
      await revalidator.revalidate()
      toast.success('Foto actualizada')
      return true
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  return (
    <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <title>{`${author.name} | Universos de Tinta`}</title>

      <Link to="/authors" className="text-amber-700 hover:underline">
        ← Volver al listado
      </Link>

      <AuthorPhoto
        name={author.name}
        src={author.photo}
        className="mt-4 h-64 w-full max-w-xs rounded-lg"
      />
      <PhotoUrlForm onSave={handleSavePhoto} />

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold">{author.name}</h1>
        <FavoriteButton favorite={author.favorite} onToggle={handleToggleFavorite} />
      </div>
      <p className="text-amber-700">{author.genre}</p>

      <p className="mt-4">{author.description}</p>

      <dl className="mt-4 grid gap-2 md:grid-cols-2">
        <div><dt className="font-semibold">Nacionalidad</dt><dd>{author.nationality}</dd></div>
        <div><dt className="font-semibold">Profesión</dt><dd>{author.profession}</dd></div>
        <div><dt className="font-semibold">Libros publicados</dt><dd>{author.booksCount}</dd></div>
        <div>
          <dt className="font-semibold">Nacimiento</dt>
          <dd>{author.birth.date} · {author.birth.city}, {author.birth.country}</dd>
        </div>
        {author.deathDate && (
          <div><dt className="font-semibold">Fallecimiento</dt><dd>{author.deathDate}</dd></div>
        )}
      </dl>

      <h2 className="mt-6 text-xl font-bold">Obras destacadas</h2>
      <ol className="mt-2 list-decimal pl-6">
        {author.works.map((work) => (
          <li key={`${work.title}-${work.year}`}>
            {work.title} {work.year ? `(${work.year})` : ''}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex gap-3">
        <Link
          to={`/edit-author/${author.id}`}
          className="rounded bg-amber-700 px-4 py-2 text-white hover:bg-amber-800"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default AuthorDetailPage
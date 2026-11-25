import { Link, useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { deleteAuthor } from '../services/authorsApi'

const AuthorDetailPage = () => {
  const author = useLoaderData()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este autor?')) return

    try {
      await deleteAuthor(author.id)
      toast.success('SE ELIMINÓ EL AUTOR')
      navigate('/authors')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <Link to="/authors" className="text-amber-700 hover:underline">
        ← Volver al listado
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{author.name}</h1>
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
      <ul className="mt-2 list-disc pl-6">
        {author.works.map((work) => (
          <li key={`${work.title}-${work.year}`}>
            {work.title} {work.year && `(${work.year})`}
          </li>
        ))}
      </ul>

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
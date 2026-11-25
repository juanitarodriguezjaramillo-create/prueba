import { useState } from 'react'
import { Link } from 'react-router'

const MAX_LENGTH = 100

const AuthorCard = ({ author }) => {
  const [showFull, setShowFull] = useState(false)

  const isLong = author.description.length > MAX_LENGTH
  const description =
    showFull || !isLong
      ? author.description
      : `${author.description.slice(0, MAX_LENGTH)}...`

  return (
    <article className="flex flex-col rounded-lg bg-white p-5 shadow-md">
      <span className="text-sm font-semibold text-amber-700">{author.genre}</span>
      <h3 className="mt-1 text-xl font-bold">{author.name}</h3>
      <p className="text-sm text-stone-500">{author.nationality}</p>
      <p className="mt-3 text-stone-700">{description}</p>
      {isLong && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="mt-1 self-start text-sm text-amber-700 hover:underline"
        >
          {showFull ? 'Ver menos' : 'Ver más'}
        </button>
      )}
      <Link
        to={`/authors/${author.id}`}
        className="mt-4 rounded bg-stone-900 px-4 py-2 text-center text-white hover:bg-stone-700"
      >
        Ver autor
      </Link>
    </article>
  )
}

export default AuthorCard
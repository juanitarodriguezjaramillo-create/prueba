import { useState } from 'react'
import AuthorCard from './AuthorCard'
import { GENRES } from '../constants'

const AuthorList = ({ authors }) => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [nationality, setNationality] = useState('Todas')

  const nationalities = [...new Set(authors.map((a) => a.nationality))]
  const text = search.trim().toLowerCase()

  const filteredAuthors = authors.filter((author) => {
    const matchesText = author.name.toLowerCase().includes(text)
    const matchesGenre = genre === 'Todos' || author.genre === genre
    const matchesNationality =
      nationality === 'Todas' || author.nationality === nationality
    return matchesText && matchesGenre && matchesNationality
  })

  const clearFilters = () => {
    setSearch('')
    setGenre('Todos')
    setNationality('Todas')
  }

  return (
    <section>
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <input
          type="search"
          aria-label="Buscar autor"
          placeholder="Buscar por nombre..."
          className="rounded border px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label="Género"
          className="rounded border px-3 py-2"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Todos">Todos los géneros</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          aria-label="Nacionalidad"
          className="rounded border px-3 py-2"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option value="Todas">Todas las nacionalidades</option>
          {nationalities.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button onClick={clearFilters} className="rounded border px-3 py-2">
          Limpiar filtros
        </button>
      </div>

      <p className="mb-4 text-stone-600">
        {filteredAuthors.length} de {authors.length} autores
      </p>

      {filteredAuthors.length === 0 ? (
        <p>No encontramos autores con esos filtros.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AuthorList
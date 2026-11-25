import { useState } from 'react'
import { GENRES } from '../constants'

const EMPTY_VALUES = {
  name: '',
  genre: GENRES[0],
  nationality: '',
  profession: '',
  booksCount: '',
  description: '',
  birthDate: '',
  birthCity: '',
  birthCountry: '',
  deathDate: '',
  works: '',
}

const authorToValues = (author) => {
  if (!author) return EMPTY_VALUES
  return {
    name: author.name,
    genre: author.genre,
    nationality: author.nationality,
    profession: author.profession,
    booksCount: String(author.booksCount),
    description: author.description,
    birthDate: author.birth.date,
    birthCity: author.birth.city,
    birthCountry: author.birth.country,
    deathDate: author.deathDate ?? '',
    works: author.works.map((w) => `${w.title} | ${w.year}`).join('\n'),
  }
}

const valuesToAuthor = (values) => ({
  name: values.name.trim(),
  genre: values.genre,
  nationality: values.nationality.trim(),
  profession: values.profession.trim(),
  booksCount: Number(values.booksCount),
  description: values.description.trim(),
  works: values.works
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, year] = line.split('|').map((part) => part.trim())
      return { title, year: Number(year) || null }
    }),
  birth: {
    date: values.birthDate,
    city: values.birthCity.trim(),
    country: values.birthCountry.trim(),
  },
  deathDate: values.deathDate,
})

const Field = ({ id, label, children }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-semibold">{label}</label>
    {children}
  </div>
)

const inputClass = 'rounded border px-3 py-2'

const AuthorForm = ({ initialAuthor, onSubmit, submitLabel = 'Guardar' }) => {
  const [values, setValues] = useState(() => authorToValues(initialAuthor))
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await onSubmit(valuesToAuthor(values))
    setSaving(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-2xl gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      <Field id="name" label="Nombre">
        <input id="name" name="name" required className={inputClass}
          value={values.name} onChange={handleChange} />
      </Field>

      <Field id="genre" label="Género">
        <select id="genre" name="genre" className={inputClass}
          value={values.genre} onChange={handleChange}>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </Field>

      <Field id="nationality" label="Nacionalidad">
        <input id="nationality" name="nationality" required className={inputClass}
          value={values.nationality} onChange={handleChange} />
      </Field>

      <Field id="profession" label="Profesión">
        <input id="profession" name="profession" required className={inputClass}
          value={values.profession} onChange={handleChange} />
      </Field>

      <Field id="booksCount" label="Cantidad de libros">
        <input id="booksCount" name="booksCount" type="number" min="1" required
          className={inputClass} value={values.booksCount} onChange={handleChange} />
      </Field>

      <Field id="description" label="Descripción">
        <textarea id="description" name="description" rows="3" required
          className={inputClass} value={values.description} onChange={handleChange} />
      </Field>

      <Field id="birthDate" label="Fecha de nacimiento">
        <input id="birthDate" name="birthDate" type="date" required
          className={inputClass} value={values.birthDate} onChange={handleChange} />
      </Field>

      <Field id="birthCity" label="Ciudad de nacimiento">
        <input id="birthCity" name="birthCity" required className={inputClass}
          value={values.birthCity} onChange={handleChange} />
      </Field>

      <Field id="birthCountry" label="País de nacimiento">
        <input id="birthCountry" name="birthCountry" required className={inputClass}
          value={values.birthCountry} onChange={handleChange} />
      </Field>

      <Field id="deathDate" label="Fecha de fallecimiento (opcional)">
        <input id="deathDate" name="deathDate" type="date" className={inputClass}
          value={values.deathDate} onChange={handleChange} />
      </Field>

      <Field id="works" label="Obras destacadas (una por línea: Título | año)">
        <textarea id="works" name="works" rows="4" required className={inputClass}
          placeholder="Cien años de soledad | 1967"
          value={values.works} onChange={handleChange} />
      </Field>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
      >
        {saving ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export default AuthorForm
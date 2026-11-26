import { useState } from 'react'
import { GENRES, NATIONALITIES } from '../constants'
import FormField from './FormField'
import SubmitButton from './SubmitButton'

const inputClass = 'rounded border px-3 py-2'

const newWork = (title = '', year = '') => ({
  rowId: crypto.randomUUID(),
  title,
  year,
})

const emptyValues = () => ({
  name: '',
  photo: '',
  genre: GENRES[0],
  nationality: '',
  profession: '',
  booksCount: '',
  description: '',
  birthDate: '',
  birthCity: '',
  birthCountry: '',
  deathDate: '',
  works: [newWork()],
})

const authorToValues = (author) => {
  if (!author) return emptyValues()

  return {
    name: author.name,
    photo: author.photo ?? '',
    genre: author.genre,
    nationality: author.nationality,
    profession: author.profession,
    booksCount: String(author.booksCount),
    description: author.description,
    birthDate: author.birth.date,
    birthCity: author.birth.city,
    birthCountry: author.birth.country,
    deathDate: author.deathDate ?? '',
    works: author.works.map((work) =>
      newWork(work.title, String(work.year ?? ''))
    ),
  }
}

const valuesToAuthor = (values) => ({
  name: values.name.trim(),
  photo: values.photo.trim(),
  genre: values.genre,
  nationality: values.nationality,
  profession: values.profession.trim(),
  booksCount: Number(values.booksCount),
  description: values.description.trim(),
  works: values.works
    .filter((work) => work.title.trim())
    .map((work) => ({
      title: work.title.trim(),
      year: work.year.trim() === '' ? null : Number(work.year),
    })),
  birth: {
    date: values.birthDate,
    city: values.birthCity.trim(),
    country: values.birthCountry.trim(),
  },
  deathDate: values.deathDate || null,
})

const validate = (values) => {
  const errors = {}
  const today = new Date().toISOString().slice(0, 10)
  const currentYear = new Date().getFullYear()

  if (values.name.trim().length < 2) {
    errors.name = 'Escribe el nombre del autor (mínimo 2 letras).'
  }
  if (values.photo.trim() && !/^(https?:\/\/|\/)/.test(values.photo.trim())) {
    errors.photo = 'Escribe una URL (https://...) o una ruta que empiece con /.'
  }
  if (!values.nationality) {
    errors.nationality = 'Selecciona una nacionalidad.'
  }
  if (!values.profession.trim()) {
    errors.profession = 'Escribe la profesión.'
  }

  const books = Number(values.booksCount)
  if (!Number.isInteger(books) || books <= 0) {
    errors.booksCount = 'Debe ser un número entero mayor que 0.'
  }

  if (values.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.'
  }

  if (!values.birthDate) {
    errors.birthDate = 'Indica la fecha de nacimiento.'
  } else if (values.birthDate > today) {
    errors.birthDate = 'La fecha de nacimiento no puede ser futura.'
  }

  if (values.deathDate) {
    if (values.birthDate && values.deathDate < values.birthDate) {
      errors.deathDate = 'No puede ser anterior al nacimiento.'
    } else if (values.deathDate > today) {
      errors.deathDate = 'La fecha de fallecimiento no puede ser futura.'
    }
  }

  if (!values.birthCity.trim()) errors.birthCity = 'Escribe la ciudad.'
  if (!values.birthCountry.trim()) errors.birthCountry = 'Escribe el país.'

  if (!values.works.some((work) => work.title.trim())) {
    errors.works = 'Agrega al menos una obra con título.'
  }

  values.works.forEach((work) => {
    const hasTitle = work.title.trim() !== ''
    const hasYear = work.year.trim() !== ''

    if (hasYear && !hasTitle) {
      errors[`work-${work.rowId}-title`] = 'Escribe el título de la obra.'
    }
    if (hasYear) {
      const year = Number(work.year)
      if (!Number.isInteger(year) || year < 1 || year > currentYear) {
        errors[`work-${work.rowId}-year`] = `Año entre 1 y ${currentYear}.`
      }
    }
  })

  return errors
}

const AuthorForm = ({ initialAuthor, onSubmit, submitLabel = 'Guardar' }) => {
  const [values, setValues] = useState(() => authorToValues(initialAuthor))
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  // Los arreglos se actualizan sin mutarlos (map, filter, spread)
  const addWork = () =>
    setValues((current) => ({ ...current, works: [...current.works, newWork()] }))

  const removeWork = (rowId) =>
    setValues((current) => ({
      ...current,
      works: current.works.filter((work) => work.rowId !== rowId),
    }))

  const updateWork = (rowId, field, value) =>
    setValues((current) => ({
      ...current,
      works: current.works.map((work) =>
        work.rowId === rowId ? { ...work, [field]: value } : work
      ),
    }))

  // Action de React 19: se ejecuta al enviar el formulario
  // y SubmitButton lee el estado "pending" con useFormStatus
  const handleAction = async () => {
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    await onSubmit(valuesToAuthor(values))
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    className: errors[name] ? `${inputClass} border-seal` : inputClass,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form
      action={handleAction}
      noValidate
      className="mx-auto grid max-w-2xl gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      <FormField id="name" label="Nombre" error={errors.name}>
        <input {...fieldProps('name')} />
      </FormField>

      <FormField id="photo" label="Foto (opcional: URL o ruta)" error={errors.photo}>
        <input placeholder="/authors/nombre.jpg" {...fieldProps('photo')} />
      </FormField>

      <FormField id="genre" label="Género">
        <select {...fieldProps('genre')}>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="nationality" label="Nacionalidad" error={errors.nationality}>
        <select {...fieldProps('nationality')}>
          <option value="">Selecciona una nacionalidad</option>
          {NATIONALITIES.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="profession" label="Profesión" error={errors.profession}>
        <input {...fieldProps('profession')} />
      </FormField>

      <FormField id="booksCount" label="Cantidad de libros" error={errors.booksCount}>
        <input type="number" min="1" {...fieldProps('booksCount')} />
      </FormField>

      <FormField id="description" label="Descripción" error={errors.description}>
        <textarea rows="3" {...fieldProps('description')} />
      </FormField>

      <FormField id="birthDate" label="Fecha de nacimiento" error={errors.birthDate}>
        <input type="date" {...fieldProps('birthDate')} />
      </FormField>

      <FormField id="birthCity" label="Ciudad de nacimiento" error={errors.birthCity}>
        <input {...fieldProps('birthCity')} />
      </FormField>

      <FormField id="birthCountry" label="País de nacimiento" error={errors.birthCountry}>
        <input {...fieldProps('birthCountry')} />
      </FormField>

      <FormField
        id="deathDate"
        label="Fecha de fallecimiento (opcional)"
        error={errors.deathDate}
      >
        <input type="date" {...fieldProps('deathDate')} />
      </FormField>

      <fieldset className="grid gap-3">
        <legend className="font-semibold">Obras destacadas</legend>

        {values.works.map((work, index) => {
          const titleError = errors[`work-${work.rowId}-title`]
          const yearError = errors[`work-${work.rowId}-year`]

          return (
            <div key={work.rowId} className="grid gap-1">
              <div className="flex gap-2">
                <input
                  id={`work-${work.rowId}-title`}
                  aria-label={`Título de la obra ${index + 1}`}
                  placeholder="Título"
                  className={`${inputClass} min-w-0 flex-1`}
                  value={work.title}
                  onChange={(e) => updateWork(work.rowId, 'title', e.target.value)}
                  aria-invalid={Boolean(titleError)}
                />
                <input
                  id={`work-${work.rowId}-year`}
                  type="number"
                  aria-label={`Año de la obra ${index + 1}`}
                  placeholder="Año"
                  className={`${inputClass} w-24 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  value={work.year}
                  onChange={(e) => updateWork(work.rowId, 'year', e.target.value)}
                  aria-invalid={Boolean(yearError)}
                />
                <button
                  type="button"
                  onClick={() => removeWork(work.rowId)}
                  disabled={values.works.length === 1}
                  aria-label={`Quitar obra ${index + 1}`}
                  className="rounded border px-3 py-2 disabled:opacity-50"
                >
                  ✕
                </button>
              </div>
              {(titleError || yearError) && (
                <p role="alert" className="text-sm text-seal">
                  {titleError || yearError}
                </p>
              )}
            </div>
          )
        })}

        {errors.works && (
          <p role="alert" className="text-sm text-seal">
            {errors.works}
          </p>
        )}

        <button
          type="button"
          onClick={addWork}
          className="self-start rounded border px-3 py-2"
        >
          Agregar obra
        </button>
      </fieldset>

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  )
}

export default AuthorForm
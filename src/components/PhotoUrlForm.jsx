import { useState } from 'react'
import SubmitButton from './SubmitButton'

// Barra para pegar la URL de una foto y guardarla
const PhotoUrlForm = ({ onSave }) => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleAction = async () => {
    const value = url.trim()

    if (!/^(https?:\/\/|\/)\S+$/.test(value)) {
      setError('Pega una URL válida (https://...) o una ruta que empiece con /.')
      return
    }

    setError('')
    const saved = await onSave(value)
    if (saved) setUrl('')
  }

  return (
    <form action={handleAction} noValidate className="mt-3 max-w-md">
      <label htmlFor="photo-url" className="text-sm font-semibold">
        Cambiar foto
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="photo-url"
          type="url"
          placeholder="Pega aquí la URL de la imagen"
          className="min-w-0 flex-1 rounded border px-3 py-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'photo-url-error' : undefined}
        />
        <SubmitButton pendingText="Guardando...">Guardar</SubmitButton>
      </div>
      {error && (
        <p id="photo-url-error" role="alert" className="mt-1 text-sm text-seal">
          {error}
        </p>
      )}
    </form>
  )
}

export default PhotoUrlForm
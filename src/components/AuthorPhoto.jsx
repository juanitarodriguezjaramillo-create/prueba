import { useState } from 'react'

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const AuthorPhoto = ({ name, src, className = '' }) => {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={`Sin foto de ${name}`}
        className={`flex items-center justify-center bg-ink-100 font-display text-5xl text-ink-900 ${className}`}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`object-cover object-top ${className}`}
    />
  )
}

export default AuthorPhoto
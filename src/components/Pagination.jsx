const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Paginación"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination
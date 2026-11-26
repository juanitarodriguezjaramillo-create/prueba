const BASE_URL = '/api/authors'

const request = async (url, options) => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'No se encontró el autor'
        : `Error del servidor (${response.status})`
    )
  }
  return response.json()
}

const jsonOptions = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const getAuthors = () => request(BASE_URL)

export const getLatestAuthors = async () => {
  const authors = await request(`${BASE_URL}?_sort=-createdAt`)
  return authors.slice(0, 3)
}

export const getAuthor = (id) => request(`${BASE_URL}/${id}`)

export const createAuthor = (author) =>
  request(BASE_URL, jsonOptions('POST', author))

export const updateAuthor = (id, author) =>
  request(`${BASE_URL}/${id}`, jsonOptions('PUT', author))

export const patchAuthor = (id, changes) =>
  request(`${BASE_URL}/${id}`, jsonOptions('PATCH', changes))

export const deleteAuthor = (id) =>
  request(`${BASE_URL}/${id}`, { method: 'DELETE' })
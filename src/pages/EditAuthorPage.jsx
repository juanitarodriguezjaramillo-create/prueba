import { useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import AuthorForm from '../components/AuthorForm'
import { updateAuthor } from '../services/authorsApi'

const EditAuthorPage = () => {
  const author = useLoaderData()
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    try {
      await updateAuthor(author.id, { ...author, ...data })
      toast.success('AUTOR ACTUALIZADO')
      navigate(`/authors/${author.id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">Editar autor</h1>
      <AuthorForm
        initialAuthor={author}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
      />
    </>
  )
}

export default EditAuthorPage

import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import AuthorForm from '../components/AuthorForm'
import { createAuthor } from '../services/authorsApi'

const AddAuthorPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    try {
      const newAuthor = await createAuthor(data)
      toast.success('¡AUTOR AGREGADO CORRECTAMENTE!')
      navigate(`/authors/${newAuthor.id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">
        Agregar nuevo autor
      </h1>

      <AuthorForm
        onSubmit={handleSubmit}
        submitLabel="Agregar autor"
      />
    </>
  )
}

export default AddAuthorPage

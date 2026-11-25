import { useFormStatus } from 'react-dom'

const SubmitButton = ({ children = 'Guardar', pendingText = 'Guardando...' }) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-seal px-5 py-2 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? pendingText : children}
    </button>
  )
}

export default SubmitButton

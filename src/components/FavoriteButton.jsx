import { useOptimistic } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const FavoriteButton = ({ favorite = false, onToggle }) => {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite)

  const toggle = async () => {
    setOptimisticFavorite(!optimisticFavorite)
    await onToggle()
  }

  return (
    <form action={toggle}>
      <button
        type="submit"
        aria-label={
          optimisticFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
        }
        aria-pressed={optimisticFavorite}
        className="text-xl text-seal"
      >
        {optimisticFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </form>
  )
}

export default FavoriteButton
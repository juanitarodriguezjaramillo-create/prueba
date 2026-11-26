
import { useEffect, useState } from 'react';
import { getAuthors, updateAuthor } from '../services/authorsApi';

export function useAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los autores desde la API
  useEffect(() => {
    let active = true;

    const loadAuthors = async () => {
      try {
        const data = await getAuthors();

        if (active) {
          setAuthors(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAuthors();

    return () => {
      active = false;
    };
  }, []);

  // Cambiar el estado de favorito
  const toggleFavorite = async (id) => {
    const author = authors.find(
      (item) => item.id === id
    );

    if (!author) return;

    try {
      const updatedAuthor = {
        ...author,
        favorite: !author.favorite
      };

      const result = await updateAuthor(id, updatedAuthor);

      setAuthors((currentAuthors) =>
        currentAuthors.map((item) =>
          item.id === id ? result : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    authors,
    loading,
    error,
    toggleFavorite
  };
}

import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AuthorsPage from './pages/AuthorsPage'
import AuthorDetailPage from './pages/AuthorDetailPage'
import AddAuthorPage from './pages/AddAuthorPage'
import EditAuthorPage from './pages/EditAuthorPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'
import { getAuthor } from './services/authorsApi'

const authorLoader = ({ params }) => getAuthor(params.id)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'authors', element: <AuthorsPage /> },
      {
        path: 'authors/:id',
        element: <AuthorDetailPage />,
        loader: authorLoader,
        errorElement: <ErrorPage />,
      },
      { path: 'add-author', element: <AddAuthorPage /> },
      {
        path: 'edit-author/:id',
        element: <EditAuthorPage />,
        loader: authorLoader,
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
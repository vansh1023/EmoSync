import { RouterProvider } from 'react-router'
import { router } from './App.routes.jsx'
import './features/shared/style/global.scss'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
import { RouterProvider } from 'react-router'
import { router } from './App.routes.jsx'
import './features/shared/style/global.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
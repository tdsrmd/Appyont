import { useAuth } from 'context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/girisyap" replace />
}

export default ProtectedRoutes

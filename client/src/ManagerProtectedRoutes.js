import { useAuth } from 'context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ManagerProtectedRoutes = () => {
  const { role } = useAuth()

  if (role === 'manager') {
    return <Outlet />
  } else {
    return <Navigate to="/anasayfa" />
  }
}

export default ManagerProtectedRoutes

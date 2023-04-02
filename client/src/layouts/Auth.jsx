import { useAuth } from 'context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { user } = useAuth()

  // if (user) return <Navigate to="/anasayfa" replace />
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-center relative">
        <Outlet />
      </div>
      <div className="bg-loginback bg-cover bg-center"></div>
    </div>
  )
}

export default Auth

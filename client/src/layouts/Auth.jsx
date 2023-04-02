import { useAuth } from 'context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { user } = useAuth()

  if (user) return <Navigate to="/anasayfa" replace />
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-center col-span-2 xl:col-span-1 relative">
        <Outlet />
      </div>
      <div className="bg-loginback bg-cover hidden xl:block bg-center"></div>
    </div>
  )
}

export default Auth

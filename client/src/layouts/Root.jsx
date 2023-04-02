import { AuthContext } from 'context/AuthContext'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className="font-inter">
      <AuthContext>
        <Outlet />
      </AuthContext>
    </div>
  )
}

export default Root

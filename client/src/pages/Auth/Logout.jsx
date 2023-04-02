import { useAuth } from 'context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    logout()
    navigate('/girisyap')
  }, [navigate, logout])
}

export default Logout

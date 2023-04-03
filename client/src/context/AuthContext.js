import jwtDecode from 'jwt-decode'
import { createContext, useContext, useEffect, useState } from 'react'

const Context = createContext()

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  const [role, setRole] = useState()
  const [setupInfo, setSetupInfo] = useState(false)

  useEffect(() => {
    const isUser = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
    if (isUser?.token) {
      const decodedToken = jwtDecode(isUser.token)
      const expirationDateTime =
        new Date(decodedToken.exp * 1000).getTime() / 1000
      const now = new Date().getTime() / 1000
      if (now > expirationDateTime) {
        logout()
      }
      if (decodedToken.role) setRole(decodedToken.role)
    }
  }, [])

  const login = (user) => {
    const { token } = user
    const { role } = jwtDecode(token)
    setUser(user)
    setRole(role)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    setRole(null)

    localStorage.removeItem('user')
  }

  const data = {
    user,
    setUser,
    logout,
    login,
    role,
    setupInfo,
    setSetupInfo
  }

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useAuth = () => useContext(Context)

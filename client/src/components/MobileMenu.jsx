import { useAuth } from 'context/AuthContext'
import React, { useRef } from 'react'
import MenuItem from './MenuItem'
import { IoMdClose } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { useClickOutside } from 'hooks/clickOutSide'

const MobileMenu = ({ menus, profile, onCancel }) => {
  const { role, logout } = useAuth()
  const ref = useRef()
  useClickOutside(ref, onCancel)
  const isManager = role === 'manager'
  return (
    <div
      ref={ref}
      className="fixed z-20 shadow-2xl top-0 left-0 py-5 px-2 h-screen w-3/4 bg-white flex flex-col justify-between"
    >
      <div className="absolute right-3 top-3" onClick={onCancel}>
        <IoMdClose className="h-5 w-5" />
      </div>
      <div>
        {menus.map((item, i) => {
          if (item.manager && !isManager) {
            return null
          }
          return <MenuItem item={item} key={i} onClick={onCancel} />
        })}
      </div>
      <div>
        {profile.map((item, i) => {
          if (item.manager && !isManager) {
            return null
          }
          return <MenuItem item={item} key={i} onClick={onCancel} />
        })}
        <div
          onClick={logout}
          className="flex items-center gap-x-2 hover:bg-theme/50 p-4 hover:rounded-2xl text-dblue-100 cursor-pointer"
        >
          <IoLogOut className="w-5 h-5 fill-current" />
          <span className="text-sm font-medium">Çıkış Yap</span>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu

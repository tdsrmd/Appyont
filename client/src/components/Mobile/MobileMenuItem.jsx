import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileMenuItem = ({ menu }) => {
  const { icon: Icon, name, url } = menu
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive ? 'text-black/80' : 'text-dblue-100'
      }
    >
      <div className="text-[9px] col-center w-16">
        <Icon className="h-6 w-6" />
        <span>{name}</span>
      </div>
    </NavLink>
  )
}

export default MobileMenuItem

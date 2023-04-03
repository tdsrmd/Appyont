import { HiMenuAlt2 } from 'react-icons/hi'
import { BsSunglasses } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'

import MenuItem from './MenuItem'
import Cat from 'assets/media/cat.png'
import { useState } from 'react'
import { useApartment } from 'context/ApartmentContext'
import { useAuth } from 'context/AuthContext'

const Sidebar = ({ menus, profile }) => {
  const [profileMenu, setProfileMenu] = useState(false)
  const { apartment } = useApartment()
  const { role, logout } = useAuth()

  const isManager = role === 'manager'

  return (
    <div className="h-full relative border-r border-sgray-100 ">
      <div className="flex flex-col justify-between h-full px-10 pb-2 pt-10">
        <div>
          <HiMenuAlt2 className="w-5 h-5 fill-dblue-100" />
        </div>
        <div className="gap-y-4 flex flex-col">
          {profileMenu && (
            <button
              className="bg-sgray-100 hover:bg-theme/50 rounded-full p-3 w-10 h-10 row-center"
              onClick={() => setProfileMenu(false)}
            >
              <IoIosArrowBack />
            </button>
          )}
          {profileMenu
            ? profile.map((item, i) => {
                if (item.manager && !isManager) {
                  return null
                }
                return <MenuItem item={item} key={i} />
              })
            : menus.map((item, i) => {
                if (item.manager && !isManager) {
                  return null
                }
                return <MenuItem item={item} key={i} />
              })}
          {profileMenu && (
            <div
              onClick={logout}
              className="flex items-center gap-x-2 hover:bg-theme/50 p-4 hover:rounded-2xl text-dblue-100 cursor-pointer"
            >
              <IoLogOut className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Çıkış Yap</span>
            </div>
          )}
        </div>
        <div>
          <div className="mb-24">
            <img src={Cat} alt="kedi" />
          </div>
          <div
            className="flex items-center gap-x-4 mt-4  hover:bg-theme/50 hover:rounded-2xl px-4 py-2 relative cursor-pointer"
            onClick={() => setProfileMenu(!profileMenu)}
          >
            <div className="bg-sgray-100 rounded-full p-3">
              <BsSunglasses className="w-7 h-7" />
            </div>
            <div>
              {role === 'manager' ? (
                <h3 className="font-bold text-sm capitalize">{`${apartment?.manager?.firstName} ${apartment?.manager?.lastName}`}</h3>
              ) : (
                <h3 className="font-bold text-sm capitalize">
                  {apartment?.name}
                </h3>
              )}
              <p className="text-xs text-sgray-400">
                {role === 'manager' ? 'Apartman Yöneticisi' : 'Apartman Sakini'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <span className="border-t w-full absolute bottom-24 border-sgray-100"></span>
    </div>
  )
}

export default Sidebar

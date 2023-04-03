import VerticalMenuItem from 'components/VerticalMenuItem'
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const menus = [
  {
    title: 'Daire',
    submenu: [
      {
        title: 'Yeni Daire Ekle',
        url: 'daireekle'
      },
      {
        title: 'Daireleri Listele',
        url: 'dairelerilistele'
      }
    ]
  },
  {
    title: 'Aidat',
    submenu: [
      {
        title: 'Aidat Verenleri Listele',
        url: 'aidatverenler'
      },
      {
        title: 'Aidat Vermeyenleri Listele',
        url: 'aidatvermeyenler'
      }
    ]
  },
  {
    title: 'Borçlar',
    submenu: [
      {
        title: 'Yeni Borç Ekle',
        url: 'borcekle'
      },
      {
        title: 'Borçları Listele',
        url: 'borclistele'
      }
    ]
  },
  {
    title: 'Gider',
    submenu: [
      {
        title: 'Yeni Gider Ekle',
        url: 'giderekle'
      },
      {
        title: 'Giderleri Listele',
        url: 'giderlistele'
      }
    ]
  }
]

const Resident = () => {
  const [isOpenMenu, setIsOpenMenu] = useState()

  return (
    <div className="xl:grid xl:grid-cols-[1fr,4fr]">
      <div className="mb-2 text-white xl:hidden">
        <div className="flex">
          <div
            className=" bg-dgray-200 text-sblack flex items-center gap-x-2 rounded-lg px-4 py-2"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="font-light text-sm">İşlemler</span>
            {isOpenMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div className="relative z-50 xl:hidden">
          <div className="absolute top-0 left-0 w-full z-10 rounded-lg">
            <div className="text-black bg-dgray-200 p-5 rounded-lg h-[450px] overflow-y-auto">
              {menus.map((menu) => (
                <div className="col-span-2 mb-4">
                  <div className="font-semibold text-lg">{menu.title}</div>
                  {menu.submenu.map((sub) => (
                    <NavLink to={sub.url} onClick={() => setIsOpenMenu(false)}>
                      <div className="text-sm font-medium py-2">
                        {sub.title}
                      </div>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="xl:grid-cols-1 gap-y-5 hidden xl:grid">
        {menus.map((menu, i) => (
          <VerticalMenuItem menu={menu} key={i} />
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Resident

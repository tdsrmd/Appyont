import VerticalMenuItem from 'components/VerticalMenuItem'
import { Outlet } from 'react-router-dom'

const menus = [
  {
    title: '',
    submenu: [
      {
        title: 'Apartman Bilgileri',
        url: 'apartmanbilgileri'
      },
      {
        title: 'Daire Giriş Bilgisi',
        url: 'dairegirisbilgisi'
      },
      {
        title: 'Yönetici Giriş Bilgisi',
        url: 'yoneticigirisbilgisi'
      }
    ]
  }
]

const Settings = () => {
  return (
    <div className="grid xl:grid-cols-[1fr,4fr]">
      <div className="hidden xl:block">
        <div className="flex flex-col gap-y-5 mb-5 xl:mb-0">
          {menus.map((menu, i) => (
            <VerticalMenuItem menu={menu} key={i} />
          ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Settings

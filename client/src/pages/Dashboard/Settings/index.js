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
    <div className="grid grid-cols-[1fr,4fr]">
      <div className="flex flex-col gap-y-5">
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

export default Settings

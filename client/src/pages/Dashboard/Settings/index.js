import VerticalMenuItem from 'components/VerticalMenuItem'
import { useAuth } from 'context/AuthContext'
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
  const { logout } = useAuth()
  return (
    <div className="grid xl:grid-cols-[1fr,4fr]">
      <div className="flex flex-col gap-y-5 mb-5 xl:mb-0">
        {menus.map((menu, i) => (
          <VerticalMenuItem menu={menu} key={i} />
        ))}
        <div
          className="text-sm font-medium cursor-pointer xl:hidden"
          onClick={logout}
        >
          <div className="text-sgray-500">Çıkış Yap</div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Settings

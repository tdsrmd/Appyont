import MobileMenuItem from './MobileMenuItem'
import { IoSettings } from 'react-icons/io5'

const MobileMenu = ({ menus }) => {
  const newMenu = [
    ...menus,
    {
      name: 'Ayarlar',
      icon: IoSettings,
      url: '/ayarlar'
    }
  ]
  return (
    <div className="xl:hidden fixed z-20 border-t border-gray-100 p-2 bottom-0 left-0 w-full bg-white flex items-center">
      <div className="flex items-center justify-between w-full">
        {newMenu?.map((menu, i) => (
          <MobileMenuItem menu={menu} key={i} />
        ))}
      </div>
      <div></div>
    </div>
  )
}

export default MobileMenu

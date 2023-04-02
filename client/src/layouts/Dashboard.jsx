import Headline from 'components/Headline'
import Sidebar from 'components/Sidebar'
import { ApartmentContext } from 'context/ApartmentContext'
import { DuesContext } from 'context/DuesContext'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import { BiMenuAltLeft } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi2'
import { GiWhiteBook, GiTakeMyMoney } from 'react-icons/gi'
import { IoKeySharp, IoSettings } from 'react-icons/io5'
import MobileMenu from 'components/MobileMenu'
import { useState } from 'react'

const swrOptions = {
  revalidateOnFocus: false
}
const menus = [
  {
    name: 'Ana Sayfa',
    icon: HiHome,
    url: '/anasayfa'
  },
  {
    name: 'İşletme Defteri',
    icon: GiWhiteBook,
    url: '/isletmedefteri'
  },
  {
    name: 'Aidat',
    icon: GiTakeMyMoney,
    url: '/aidat',
    manager: true
  },
  {
    name: 'Yönetim',
    icon: IoKeySharp,
    url: '/yonetim',
    manager: true
  }
]
const profile = [
  {
    name: 'Ayarlar',
    icon: IoSettings,
    url: '/ayarlar',
    manager: true
  }
]
const Dashboard = () => {
  const [isMenu, setIsMenu] = useState(false)
  return (
    <SWRConfig value={swrOptions}>
      <ApartmentContext>
        <div className="grid xl:grid-cols-[300px_auto] grid-rows-1 h-screen">
          <div>
            <div className="w-[300px] fixed bg-white h-full hidden xl:block">
              <Sidebar menus={menus} profile={profile} />
            </div>
          </div>
          <div className="flex flex-1 flex-col xl:p-12 pt-6">
            <span className="mb-5 xl:hidden">
              <BiMenuAltLeft className="h-6 w-6" onClick={() => setIsMenu(!isMenu)} />
            </span>
            {isMenu && <MobileMenu menus={menus} profile={profile} onCancel={() => setIsMenu(false)} />}
            <Headline />
            <div className="pt-10 pb-5 ">
              <DuesContext>
                <Outlet />
              </DuesContext>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          draggablePercent={60}
          transition={Zoom}
          pauseOnFocusLoss={false}
          hideProgressBar={true}
          theme="dark"
          toastStyle={{ backgroundColor: '#1d2226', color: 'white', minWidth: '320px' }}
        />
      </ApartmentContext>
    </SWRConfig>
  )
}

export default Dashboard

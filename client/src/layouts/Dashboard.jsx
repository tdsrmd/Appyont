import Headline from 'components/Headline'
import Sidebar from 'components/Sidebar'
import { ApartmentContext } from 'context/ApartmentContext'
import { DuesContext } from 'context/DuesContext'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import { HiHome } from 'react-icons/hi2'
import { GiWhiteBook, GiTakeMyMoney } from 'react-icons/gi'
import { IoKeySharp, IoSettings } from 'react-icons/io5'
import MobileMenu from 'components/MobileMenu'

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
  return (
    <SWRConfig value={swrOptions}>
      <ApartmentContext>
        <div className="grid xl:grid-cols-[300px_auto] grid-rows-1 h-screen">
          <div className="hidden xl:block">
            <div className="w-[300px] fixed bg-white h-full">
              <Sidebar menus={menus} profile={profile} />
            </div>
          </div>
          <div className="flex flex-1 flex-col xl:p-12 pt-6">
            <MobileMenu menus={menus} />
            <Headline />
            <div className="xl:pt-10 pt-5 pb-16 xl:pb-0">
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
          toastStyle={{
            backgroundColor: '#1d2226',
            color: 'white',
            minWidth: '320px'
          }}
        />
      </ApartmentContext>
    </SWRConfig>
  )
}

export default Dashboard

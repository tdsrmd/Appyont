import React, { useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import MobileTopMenuItem from './MobileTopMenuItem'
import { useClickOutside } from 'hooks/clickOutSide'
import { useAuth } from 'context/AuthContext'
import BasicModal from 'components/Modal/BasicModal'

const managerMenus = [
  {
    title: 'Daire',
    submenu: [
      {
        title: 'Yeni Daire Ekle',
        url: 'yonetim/daireekle'
      },
      {
        title: 'Daireleri Listele',
        url: 'yonetim/dairelerilistele'
      }
    ]
  },
  {
    title: 'Aidat',
    submenu: [
      {
        title: 'Aidat Verenleri Listele',
        url: 'yonetim/aidatverenler'
      },
      {
        title: 'Aidat Vermeyenleri Listele',
        url: 'yonetim/aidatvermeyenler'
      }
    ]
  },
  {
    title: 'Borçlar',
    submenu: [
      {
        title: 'Yeni Borç Ekle',
        url: 'yonetim/borcekle'
      },
      {
        title: 'Borçları Listele',
        url: 'yonetim/borclistele'
      }
    ]
  },
  {
    title: 'Gider',
    submenu: [
      {
        title: 'Yeni Gider Ekle',
        url: 'yonetim/giderekle'
      },
      {
        title: 'Giderleri Listele',
        url: 'yonetim/giderlistele'
      }
    ]
  }
]

const settingsMenus = [
  {
    submenu: [
      {
        title: 'Apartman Bilgileri',
        url: 'ayarlar/apartmanbilgileri'
      },
      {
        title: 'Daire Giriş Bilgileri',
        url: 'ayarlar/dairegirisbilgisi'
      },
      {
        title: 'Yönetici Giriş Bilgileri',
        url: 'ayarlar/yoneticigirisbilgisi'
      }
    ]
  }
]
const MobileTopMenu = () => {
  const { logout } = useAuth()
  const { pathname } = useLocation()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isLogOutModal, setIsLogOutModal] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()
  useClickOutside(ref, () => setIsOpenMenu(false))

  return (
    <div className="xl:hidden" ref={ref}>
      {isLogOutModal && (
        <BasicModal
          title="Çıkış Yapılsın mı?"
          text="İstediğin zaman tekrar oturum açabilirsin."
          onOk={logout}
          onCancel={() => setIsLogOutModal(false)}
          okButtonText="Çıkış Yap"
        />
      )}
      <div className="fixed z-20 top-0 left-0 w-full bg-white py-2 px-3 border-b border-gray-100">
        <div className="flex justify-between items-center h-6">
          <div className="w-20" onClick={() => navigate(-1)}>
            <IoIosArrowBack className="w-6 h-6" />
          </div>
          {(pathname.startsWith('/yonetim') ||
            pathname.startsWith('/ayarlar')) && (
            <div
              className="flex items-center gap-x-1 font-semibold"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              İşlemler <IoIosArrowDown />
            </div>
          )}
          <div className="max-w-[70px] min-w-[70px] text-end">
            {pathname.startsWith('/ayarlar') && (
              <span
                className="font-medium text-sm  text-gray-500"
                onClick={() => setIsLogOutModal(true)}
              >
                Çıkış Yap
              </span>
            )}
          </div>
        </div>
        {isOpenMenu && pathname.startsWith('/yonetim') && (
          <MobileTopMenuItem
            menus={managerMenus}
            onCancel={() => setIsOpenMenu(false)}
          />
        )}
        {isOpenMenu && pathname.startsWith('/ayarlar') && (
          <MobileTopMenuItem
            menus={settingsMenus}
            onCancel={() => setIsOpenMenu(false)}
          />
        )}
      </div>
    </div>
  )
}

export default MobileTopMenu

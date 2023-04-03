import VerticalMenuItem from 'components/VerticalMenuItem'
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
  return (
    <div className="xl:grid xl:grid-cols-[1fr,4fr]">
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

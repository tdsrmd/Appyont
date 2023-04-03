import { Route, Navigate, Routes } from 'react-router-dom'

//Layouts
import Auth from 'layouts/Auth'
import Dashboard from 'layouts/Dashboard'
import Root from 'layouts/Root'

//Protected
import ProtectedRoutes from 'ProtectedRoutes'
import ManagerProtectedRoutes from 'ManagerProtectedRoutes'

//Auth
import Login from 'pages/Auth/Login'
import ResidentLogin from 'pages/Auth/ResidentLogin'
import Register from 'pages/Auth/Register'
import ForgetPassword from 'pages/Auth/ForgetPassword'

//Setup
import Setup from 'pages/Setup'

//Dashboard
import Home from 'pages/Dashboard/Home'
import Notebook from 'pages/Dashboard/Notebook'
import Dues from 'pages/Dashboard/Dues'
import Settings from 'pages/Dashboard/Settings'

//Manager
import Manager from 'pages/Dashboard/Manager'
import AddResident from 'pages/Dashboard/Manager/AddResident'
import AddDebt from 'pages/Dashboard/Manager/AddDebt'
import ListResidents from 'pages/Dashboard/Manager/ListResidents'
import AddExpense from 'pages/Dashboard/Manager/AddExpense'
import ListExpenses from 'pages/Dashboard/Manager/ListExpenses'
import ListDebt from 'pages/Dashboard/Manager/ListDebt'
import ListPaidDues from 'pages/Dashboard/Manager/ListPaidDues'
import ListUnPaidDues from 'pages/Dashboard/Manager/ListUnPaidDues'
import ApartmentInfo from 'pages/Dashboard/Settings/ApartmentInfo'
import ResidentsAuth from 'pages/Dashboard/Settings/ResidentsAuth'
import ManagerInfo from 'pages/Dashboard/Settings/ManagerInfo'

const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/anasayfa" replace />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route element={<Dashboard />}>
          <Route path="anasayfa" element={<Home />} />
          <Route path="isletmedefteri" element={<Notebook />} />
          <Route path="aidat" element={<Dues />} />
          <Route path="/" element={<ManagerProtectedRoutes />}>
            <Route path="yonetim" element={<Manager />}>
              <Route index element={<Navigate to="daireekle" replace />} />
              <Route path="daireekle" element={<AddResident />} />
              <Route path="dairelerilistele" element={<ListResidents />} />
              <Route path="aidatverenler" element={<ListPaidDues />} />
              <Route path="aidatvermeyenler" element={<ListUnPaidDues />} />
              <Route path="borcekle" element={<AddDebt />} />
              <Route path="borclistele" element={<ListDebt />} />
              <Route path="giderekle" element={<AddExpense />} />
              <Route path="giderlistele" element={<ListExpenses />} />
            </Route>
            <Route path="ayarlar" element={<Settings />}>
              <Route
                index
                element={<Navigate to="apartmanbilgileri" replace />}
              />
              <Route path="apartmanbilgileri" element={<ApartmentInfo />} />
              <Route path="dairegirisbilgisi" element={<ResidentsAuth />} />
              <Route path="yoneticigirisbilgisi" element={<ManagerInfo />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="kurulum" element={<Setup />} />
      <Route element={<Auth />}>
        <Route path="girisyap" element={<Login />} />
        <Route path="apartmansakinigirisyap" element={<ResidentLogin />} />
        <Route path="kayitol" element={<Register />} />
        <Route path="sifremiunuttum" element={<ForgetPassword />} />
      </Route>
    </Route>
  </Routes>
)

export default AllRoutes

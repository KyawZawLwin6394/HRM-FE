import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Employee from './pages/Employee/employeeList'
import EmployeeAdd from './pages/Employee/employeeAdd'
import Position from './pages/Position/Position.jsx'
import AuthContainer from './util/AuthContainer.jsx'
import PositionRegsiter from './pages/Position/Add'


export default function RouteFile() {
  return (
    <>
      <BrowserRouter>
        <div className="head bg-white rounded-lg shadow-md min-w-[1080px]">  <Nav /></div>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route element={<AuthContainer />}>
            <Route path='/home' element={<Dashboard />} />

            {/* Employee */}
            <Route path='/emp' element={<Employee />} />
            <Route path='/emp-add' element={<EmployeeAdd />} />

            {/* Position */}
            <Route path='/position' element={<Position />} />
            <Route path='/position/register' element={<PositionRegsiter />} />
          </Route>
          {/* <AuthContainer component={<Dashboard />} path='/home'></AuthContainer> */}

        </Routes>
      </BrowserRouter >
    </>
  )
}

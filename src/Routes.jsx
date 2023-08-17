import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Employee from './pages/Employee/employeeList'
import EmployeeAdd from './pages/Employee/employeeAdd'
import EmployeeUpdate from './pages/Employee/employeeDetail'
import Position from './pages/Position/Position.jsx'
import AuthContainer from './util/AuthContainer.jsx'
import PositionRegsiter from './pages/Position/Add'
import Department from './pages/Department/Department'
import DepartmentRegister from './pages/Department/DepartmentRegister'
import PositionUpdate from './pages/Position/PositionUpdate';


export default function RouteFile() {
  return (
    <>
      <BrowserRouter>
       <div className='flex-grow'>
       <Nav></Nav>
       </div>
        <Routes>
          <Route path='/' element={<Login />}></Route>

          <Route element={<AuthContainer />}>
            <Route path='/home' element={<Dashboard />} />

            {/* Department */}
            <Route path='/department' element={<Department />}></Route>
            <Route path='/department/register' element={<DepartmentRegister />}></Route>

            {/* Employee */}
            <Route path='/emp' element={<Employee />} />
            <Route path='/emp-add' element={<EmployeeAdd />} />
            <Route path='/emp-update/:id' element={<EmployeeUpdate />} />

            {/* Position */}
            <Route path='/position' element={<Position />} />
            <Route path='/position/register' element={<PositionRegsiter />} />
            <Route path='/position/update/:id' element={<PositionUpdate />} />
          </Route>
          {/* <AuthContainer component={<Dashboard />} path='/home'></AuthContainer> */}

        </Routes>
      </BrowserRouter >
    </>
  )
}

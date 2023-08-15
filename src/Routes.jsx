import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about/about.jsx'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'

import Sidebar from './components/Sidebar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Employee from './pages/Employee/employeeList'
import EmployeeAdd from './pages/Employee/employeeAdd'
import Position from './pages/Position/Position.jsx'


export default function RouteFile() {
  return (
    <>
      <BrowserRouter>
        <div className="head bg-white rounded-lg shadow-md min-w-[1080px]">  <Nav /></div>
        <Routes>

          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Dashboard />}></Route>

          <Route path='/' element={<Home />}></Route>
          <Route path='/navbar' element={<Nav />}></Route>
          <Route path='/sidebar' element={<Sidebar />}></Route>

          <Route path='/about' element={<About />}></Route>
          <Route path='/sidebar' element={<Sidebar/>}></Route>

          {/* Employee */}
          <Route path='/emp' element={<Employee />}></Route>
          <Route path='/emp-add' element={<EmployeeAdd />}></Route>

          {/* Position */}
          <Route path='/position' element={<Position />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

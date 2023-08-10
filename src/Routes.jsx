import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about/about.jsx'
import Home from './pages/index'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Sidebar from './components/Sidebar/index'
import Dashboard from './pages/Dashboard/index.jsx'
export default function RouteFile () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Dashboard />}></Route>
          <Route path='/navbar' element={<Nav />}></Route>
          <Route path='/sidebar' element={<Sidebar />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about/about.jsx'
import Home from './pages/index'
import Nav from './components/Navbar/index'
import Sidebar from './components/Sidebar/index.jsx'

export default function RouteFile () {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/navbar' element={<Nav />}></Route>
          <Route path='/sidebar' element={<Sidebar />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Sidebar from './Layouts/Sidebar'
import PagesRoutes from './routes/Routes'

const App = () => {
  const route = document.location.pathname.replace("/", "").split("/")[0]
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleSidebar = (e) => {
    e.preventDefault()
    setOpenSidebar(!openSidebar)
  }
  return (
    <Router>
      {!["", "login", "signup", "call_for_application"].includes(route) &&
        <Navbar toggleSidebar={toggleSidebar} openSidebar={openSidebar}  />
      }
      {!["", "login", "signup", "call_for_application"].includes(route) &&
        <Sidebar route={route} openSidebar={openSidebar} />
      }
      <PagesRoutes />
    </Router>
  )
}

export default App

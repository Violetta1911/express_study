
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes'
// import {Navbar} from './components/Navbar'
// import {Loader} from './components/Loader'
import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import { Navbar } from './components/Navbar'

function App() {
  const { authData, login, logout, } = useAuth()
  const isAuthenticated = authData.token;
  const routes = AppRoutes(isAuthenticated)

  // if (!ready) {
  //   return <Loader />
  // }

  return (
    <AuthContext.Provider value={{ ...authData, isAuthenticated, login, logout }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>

  )
}

export default App

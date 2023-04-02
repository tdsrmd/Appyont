import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.css'

import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'
import Routes from 'Routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <Routes />
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.css'

import { RouterProvider } from 'react-router-dom'
import Routes from 'Routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteFile from './Routes'
import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouteFile />
    </NextUIProvider>
  </React.StrictMode>
)

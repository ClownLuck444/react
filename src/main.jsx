import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import { BodegaProvider } from './context/BodegaProvider'
import router from './router'
 import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BodegaProvider>
   <RouterProvider router={router}/>
   </BodegaProvider>
  </React.StrictMode>,
)

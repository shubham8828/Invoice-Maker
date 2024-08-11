import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import Invoce from './components/invoice/Invoce'
import NewInvoice from './components/new-invoice/NewInvoice'
import Setting from './components/setting/Setting'
import InvoiceDetails from './components/invoiceDetails/InvoiceDetails'
import Master from './pages/Master'
import Contact from './pages/Contact'
import About from './pages/About'

const App = () => {
  const myRoutes=createBrowserRouter([

    {path:'/', element: <Master/>},
    {path:'/about', element: <About/>},
    {path:'/contact', element: <Contact/>},
    {path:'/login', element: <Login />},
    {path:'/register', element: <Register />},
    {path:'/dashboard', element: <Dashboard />,children:[
      {path:'' , element:<Home/>},
      {path:'home' , element:<Home/>},
      {path:'invoices' , element:<Invoce/>},
      {path:'new-invoice' , element:<NewInvoice/>},
      {path:'setting' , element:<Setting/>},
      {path:'invoice-details' , element:<InvoiceDetails/>},
    ]},
  ])
  return (
    <div>
      <RouterProvider router={myRoutes}  >

      </RouterProvider>
    </div>
  )
}

export default App
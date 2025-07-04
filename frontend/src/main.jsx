import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './redux/features/store.js'
import Login from './pages/Auth/Login.jsx'
import Shop from './pages/User/Shop.jsx'
import Signup from './pages/Auth/signup.jsx'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
   <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
   </Route>
   <Route path="/login" element={<Login />}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path="/shop" element={<Shop/>}/>
  </Route>
 )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <RouterProvider router={router}/>
  </Provider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './redux/features/store.js'
import Login from './pages/auth/Login.jsx'
import Shop from './pages/user/shop.jsx'
import Signup from './pages/auth/signup.jsx'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './pages/user/private-route.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/admin-route.jsx'
import UsersList from './pages/admin/users-list.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
   <Route path='' element={<PrivateRoute/>}>
      <Route path='profile' element={<Profile/>}/>
   </Route>
   <Route path="/login" element={<Login />}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path="/shop" element={<Shop/>}/>
   {/* Admin routes */}
   <Route path='/admin' element={<AdminRoute/>}>
    <Route path="users-list" element={<UsersList/>}/>
    <Route path="category" element={<CategoryList/>}/>
   </Route>
  </Route>
 )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <RouterProvider router={router}/>
  </Provider>
)

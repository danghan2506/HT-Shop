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
import ProductForm from './pages/admin/ProductForm.jsx'
import { Toaster } from 'sonner'
import UpdateProduct from './pages/admin/UpdateProduct.jsx'
import AllProduct from './pages/admin/AllProduct.jsx'
import Home from './pages/home.jsx'
import Favourite from './pages/user/favourite.jsx'
import ProductDetails from './pages/product-details.jsx'
import Cart from './pages/cart.jsx'
import Shipping from './pages/orders/shipping.jsx'
import PlaceOrder from './pages/orders/place-order.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import OrderSummary from './pages/orders/order-summary.jsx'
import UserOrders from './pages/orders/user-orders.jsx'
import AllOrders from './pages/admin/all-orders.jsx'
import AdminDashboard from './pages/admin/admin-dashboard.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
   <Route path='' element={<PrivateRoute/>}>
      <Route path='profile' element={<Profile/>}/>
      <Route path='/shipping' element={<Shipping/>}/>
      <Route path='/place-order' element={<PlaceOrder/>}/>
      <Route path='/order/:orderId' element={<OrderSummary/>}/>
      <Route path='/my-orders' element={<UserOrders/>}/>
   </Route>
   <Route path="/login" element={<Login />}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path="/shop" element={<Shop/>}/>
   <Route path= "/" index={true} element={<Home/>}/>
   <Route path='/favourite' element={<Favourite/>}/>
   <Route path='/product/:id' element={<ProductDetails/>}/>
   <Route path ='/cart' element={<Cart/>}/>
   {/* Admin routes */}
   <Route path='/admin' element={<AdminRoute/>}>
    <Route path="users-list" element={<UsersList/>}/>
    <Route path="category" element={<CategoryList/>}/>
    <Route path="create-products" element={<ProductForm/>}/>
    <Route path="all-products" element={<AllProduct/>}/>
    <Route path="product/update/:_id" element={<UpdateProduct/>}/>
    <Route path="all-orders" element={<AllOrders/>}/>
    <Route path="admin-dashboard" element={<AdminDashboard/>}/>
   </Route>
  </Route>
 )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster/>
    <PayPalScriptProvider>
      <RouterProvider router={router}/>
    </PayPalScriptProvider>
  </Provider>
)

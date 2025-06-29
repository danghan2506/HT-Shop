import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link , useNavigate} from 'react-router-dom';
import "./Navigation.css"
const Navigation = () =>  {
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }
  const closeSideBar = () => {
    setShowSideBar(false)
  }
  return (
    <div style={{zIndex: 999}} className={`${showSideBar ? "hidden" : "flex"} xl:flex sm:flex md:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container" >
      <div className='flex flex-col justify-center space-y-4'>
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
          <HomeIcon fontSize='medium' className='mr-2 mt-[3rem]'/>
          <span className='hidden nav-item-name mt-[3rem]'>HOME</span>{" "}
        </Link>
         <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
          <ShoppingBagIcon fontSize='medium' className='mr-2 mt-[3rem]'/>
          <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>{" "}
        </Link>
         <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
          <ShoppingCartIcon fontSize='medium' className='mr-2 mt-[3rem]'/>
          <span className='hidden nav-item-name mt-[3rem]'>CART</span>{" "}
        </Link>
         <Link to="/favourite" className="flex items-center transition-transform transform hover:translate-x-2">
          <FavoriteIcon fontSize='medium' className='mr-2 mt-[3rem]'/>
          <span className='hidden nav-item-name mt-[3rem]'>FAVOURITE</span>{" "}
        </Link>
      </div>
    </div>
  )
}
export default Navigation

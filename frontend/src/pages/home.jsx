import React from 'react'
import AdminMenu from '../components/admin-menu'
import { useGetTopProductsQuery } from '../redux/api/product-api-slice'
import {Link, useParams} from 'react-router-dom'
import Header from '../components/header'
const Home = () => {
  const {keywords} = useParams()
  const {data, isLoading, error} = useGetTopProductsQuery()
  return (
    <>
    {!keywords ? <Header/> : null}
      {/* <div className='flex justify-between items-center'>
        <h1 className='ml-[20rem] mt-[10rem] text-3[rem]'>
          Specical Products
        </h1>
        <Link to='/shop' className='bg-neutral-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]'>
        </Link>
      </div> */}
    </>
    
  )
}

export default Home
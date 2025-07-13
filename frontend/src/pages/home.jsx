import React from 'react'
import AdminMenu from '../components/admin-menu'
import { useGetTopProductsQuery } from '../redux/api/product-api-slice'
import {useParams} from 'react-router-dom'
import Header from '../components/header'
const Home = () => {
  const {keywords} = useParams()
  const {data, isLoading, error} = useGetTopProductsQuery()
  return (
    <>
    {!keywords ? <Header/> : null}
    </>
    
  )
}

export default Home
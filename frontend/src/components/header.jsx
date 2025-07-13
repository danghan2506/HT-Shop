import React from 'react'
import { useGetTopProductsQuery } from '../redux/api/product-api-slice'
import Loading from './loader'
import SmallProduct from './small-product'
import CarouselProductDisplay from './carousel-product-display'

const Header = () => {
  const {data, isLoading, error} = useGetTopProductsQuery()
  console.log(data)
  if(isLoading){
    return <Loading/>
  }
  if(error){
    return <div>Error while loading product</div>
  }
  return (
    <>
    <div className='flex justify-around'>
      <div className='xl:block lg:hidden md:hidden sm:hidden'>
        <div className='grid grid-cols-2'>
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product}/>
               </div>
          ))}
        </div>
      </div>
      <CarouselProductDisplay/>
    </div>
    </>
  )
}

export default Header
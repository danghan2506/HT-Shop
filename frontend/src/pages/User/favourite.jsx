import React from 'react'
import { useSelector } from 'react-redux'
import SmallProduct from '../../components/small-product'
const Favourite = () => {
    const favourites = useSelector((state) => state.favourites)
  return (
    <div className='ml-[10rem]'>
         <h1 className="text-2xl sm:text-3xl font-bold text-black">
                FAVOURITE PRODUCTS
              </h1>
              <p className="text-gray-600 mt-1">
                {favourites.length} {favourites.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
        <div className='grid grid-cols-2  gap-4 p-4'>
            {favourites.map((product) => (
                <SmallProduct key={product._id} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default Favourite
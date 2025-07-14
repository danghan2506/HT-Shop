import React, { useEffect } from 'react'
import { Heart } from 'lucide-react'
import { addToFavrourites, removeFromFavourites, setFavourites } from '../redux/features/Auth/favourite/fav-slice'
import { useDispatch, useSelector } from 'react-redux'
import { addFavToLocalStorage, removeFavFromLocalStorage, getFavFromLocalStorage } from '../utils/local-storage'
const FavouriteButton = ({product}) => {
   const dispatch = useDispatch()
   const favourite = useSelector((state) => state.favourites)
   const isFavourite = favourite.some((p) => p._id === product._id);
   useEffect(() => {
    const favouritesFromLocalStorage = getFavFromLocalStorage()
    dispatch(setFavourites(favouritesFromLocalStorage))
   }, [])
   const toggleFavourite = () => {
    if(isFavourite){
        dispatch(removeFromFavourites(product._id))
        removeFavFromLocalStorage(product._id)
    }
    else{
        dispatch(addToFavrourites(product))
        addFavToLocalStorage(product)
    }
   }
  return (
   <div 
      className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer p-2 rounded-full ${
        isFavourite 
          ? 'bg-rose-100 hover:bg-rose-200' 
          : 'bg-white/80 hover:bg-white'
      }`} 
      onClick={toggleFavourite}
    >
        {isFavourite ? (
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
        ) : (
            <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors duration-200" />
        )}
    </div>
  )
}

export default FavouriteButton
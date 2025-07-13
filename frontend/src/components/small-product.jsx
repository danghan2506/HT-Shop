import React from 'react'
import { Heart } from 'lucide-react'
import {Link} from "react-router-dom"
const SmallProduct = ({product}) => {
    return(
<div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        {/* <Heart product={product} /> */}
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-neutral-100 text-neutral-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-neutral-900 dark:text-neutral-300">
              {product.price} VNĐ
            </span>
          </h2>
        </Link>
      </div>
    </div>
    )
     
}

export default SmallProduct
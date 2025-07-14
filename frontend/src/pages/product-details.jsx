import React from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "sonner"
import { useGetProductDetailsQuery, useCreateReviewMutation} from '../redux/api/product-api-slice';
import Loading from '../components/loader';
import moment from 'moment'
const ProductDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id: productId} = useParams()
  const {userInfo} = useSelector((state) => state.auth)
  const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()

  return (
    <>
    <div>
        <Link to='/' className='text-blue-500 hover:underline'>Back to Home</Link>
    </div>
    </>
  )
}

export default ProductDetails
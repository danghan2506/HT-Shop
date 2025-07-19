import React, {useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import {useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation} '../../redux/api/order-api-slice'
const OrderSummary = () => {
  const {orderId} useParams()
  const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)
  const [payOrder, {isLoading}] = useDeliverOrderMutation()
  const {userInfo} = useSelector((state) => state.auth)
  const {data: payPal, isLoading: loadingPaypal, error: payPalError} = useGetPaypalClientIdQuery()  
  return (
    <div>OrderSummary</div>
  )
}

export default OrderSummary
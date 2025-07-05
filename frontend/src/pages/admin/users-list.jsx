import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUserListQuery } from '../../redux/api/user-api-slice'

const UsersList = () => {
  const {allUsers} = useUserListQuery()
  
  return (
    <div>UsersList</div>
  )
}

export default UsersList
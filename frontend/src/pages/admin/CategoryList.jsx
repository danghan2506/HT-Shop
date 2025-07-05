import React , {useState} from 'react'
import { useDelteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useGetAllCategoriesQuery } from '../../redux/api/category-api-slice'
const CategoryList = () => {
    const {data: categories} = useGetAllCategoriesQuery()
    console.log(categories)
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList
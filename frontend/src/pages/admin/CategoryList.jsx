import React, { useState } from 'react'
import { useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useGetAllCategoriesQuery } from '../../redux/api/category-api-slice'
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import CategoryForm from './CategoryForm'
const CategoryList = () => {
  const { data } = useGetAllCategoriesQuery();
const categories = data?.listCategory || [];
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const createCategoryHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        console.log(`${result.name} is created.`)
        toast.success(`${result.name} is created.`);
        setName(""); // Clear input after successful creation
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const updateCategoryHandler = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoryHandler = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
          <div className="md:w-3/4 p-3">
            <div className="h-12">Manage Categories</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={createCategoryHandler}></CategoryForm>
            <br />
            <hr />
            <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <Button
                className="bg-white text-black py-2 px-4 rounded-lg m-3"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
          </div>
        </div>
  );
}

export default CategoryList
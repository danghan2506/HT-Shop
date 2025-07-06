import React, { useState } from 'react'
import { useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useGetAllCategoriesQuery } from '../../redux/api/category-api-slice'
import { Button } from "@/components/ui/button"
import {Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import CategoryForm from './CategoryForm'
const CategoryList = () => {
  const { data} = useGetAllCategoriesQuery();
  const categories = data?.listCategory || [];
console.log(categories)
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
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
    console.log("Created:", result); // result = { _id, name, __v }
    toast.success(`${result.newCategory.name} is created.`);
    setName(""); // Clear input after successful creation
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
        console.log(result)
        toast.success(`${result.updateCategory.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoryHandler = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      console.log(result)
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

    return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        {/* Form tạo mới */}
        <CategoryForm value={name} setValue={setName} handleSubmit={createCategoryHandler} />
        <br />
        <hr />

        {/* Danh sách category */}
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="py-2 px-4 rounded-lg m-3"
                    onClick={() => {
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }}
                  >
                    {category.name}
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={updateCategoryHandler}>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Make changes to the category name below.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={updatingName}
                          onChange={(e) => setUpdatingName(e.target.value)}
                        />
                      </div>
                    </div>

                    <DialogFooter className="gap-2">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={deleteCategoryHandler}
                        >
                          Delete
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button type="submit">Update</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList
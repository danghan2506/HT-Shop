import React, { useState } from 'react'
import {
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery
} from '../../redux/api/category-api-slice'
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import CategoryForm from './CategoryForm'
import AdminMenu from '../../components/admin-menu'
const CategoryList = () => {
  const { data } = useGetAllCategoriesQuery()
  const categories = data?.listCategory || []

  const [name, setName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updatingName, setUpdatingName] = useState("")
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const createCategoryHandler = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error("Category name is required")
      return
    }
    try {
      const result = await createCategory({ name }).unwrap()
      toast.success(`${result.newCategory.name} is created.`)
      setName("")
    } catch (error) {
      console.error(error)
      toast.error("Creating category failed, try again.")
    }
  }

  const updateCategoryHandler = async (e) => {
    e.preventDefault()
    if (!updatingName) {
      toast.error("Category name is required")
      return
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName }
      }).unwrap()
      toast.success(`${result.updateCategory.name} is updated`)
      setSelectedCategory(null)
      setUpdatingName("")
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCategoryHandler = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()
      toast.success(`${result.name} is deleted.`)
      setSelectedCategory(null)
    } catch (error) {
      console.error(error)
      toast.error("Category deletion failed. Try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
            <AdminMenu/>
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={createCategoryHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Dialog key={category._id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory(category)
                  setUpdatingName(category.name)
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
                  <div className="grid gap-2">
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
        ))}
      </div>
    </div>
  )
}

export default CategoryList

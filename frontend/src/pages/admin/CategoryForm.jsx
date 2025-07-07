import React from 'react'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const CategoryForm = ({ value, setValue, handleSubmit, buttonText = "Submit", handleDelete }) => {
  const form = useForm({
    defaultValues: {
      name: value || ""
    }
  })

  // Update form when value changes
  React.useEffect(() => {
    form.setValue("name", value || "")
  }, [value, form])

  const onSubmit = (data) => {
    // Create a synthetic event object for compatibility
    const syntheticEvent = {
      preventDefault: () => {},
      target: { name: { value: data.name } }
    }
    handleSubmit(syntheticEvent)
  }

  return (
    <div className='p-3 min-w-[300px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Name category here" 
                    type="text" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setValue(e.target.value)
                    }}
                    className="w-full max-w-md"
                  />
                </FormControl>
                <FormDescription>Enter category's name here!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          
          <div className="flex justify-between">
            <Button type="submit">{buttonText}</Button>
            {handleDelete && (
              <Button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CategoryForm
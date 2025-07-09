import React from "react";
import { AlignJustify, X} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import {Button} from "@/components/ui/button";
const AdminMenu = () => {
  return (
        <div className="fixed top-4 right-6 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-400 hover:bg-neutral-700 text-white shadow-md rounded-full p-2">
                <AlignJustify className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
            <Link to="/admin/dashboard">
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <Link to="/admin/users-list">
              <span>Users</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/admin/category">
              <span>Category</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/admin/create-products">
              <span>Create product</span>
            </Link>
          </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
  );
};

export default AdminMenu;

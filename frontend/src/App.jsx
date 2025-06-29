import { Button } from "@/components/ui/button"
import {ToastContainer} from "react-toastify"
import {Outlet} from "react-router-dom"
import Navigation from "./pages/Auth/Navigation"
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
function App({ children }) {
  return (
   <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default App

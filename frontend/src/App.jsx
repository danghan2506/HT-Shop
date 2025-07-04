
import {Outlet} from "react-router-dom"
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./pages/Auth/app-sidebar"
function App() {
  return (
   <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}

export default App

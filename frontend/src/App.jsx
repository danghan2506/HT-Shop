
import {Outlet} from "react-router-dom"
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./pages/auth/app-sidebar"
function App() {
  return (
  <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <Outlet/>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App

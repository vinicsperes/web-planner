"use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Header } from "@/components/header/Header"

export default function WorkoutDashboard() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col px-48 gap-4">
            <h1>Workout</h1>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

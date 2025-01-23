    "use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Header } from "@/components/header/Header"
import WorkoutTracker from "./components/WorkoutTracker"

export default function Workout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col px-48 gap-4">
            <WorkoutTracker />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

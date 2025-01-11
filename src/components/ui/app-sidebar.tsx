import * as React from "react"
import {
  BookOpen,
  Bot,
  PencilRuler,
  Settings2,
  Sparkle,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavUser } from "@/components/ui/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Xydril",
    email: "johndoe@yahoo.com.br",
    avatar: "https://github.com/lviana15.png",
  },
  navMain: [
    {
      title: "Tools",
      url: "#",
      icon: PencilRuler,
      isActive: true,
      items: [
        {
          title: "Habit",
          url: "#",
        },
        {
          title: "Todo",
          url: "#",
        },
        {
          title: "Note",
          url: "#",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row justify-between">
        <Sparkle size={32} />
        {state != 'collapsed' && <SidebarTrigger />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {state == 'collapsed' && <SidebarTrigger />}
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

import { useLocation } from "react-router-dom";

import { ChevronRight, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'

import ThemeToggle from '../floatingMenu/ components/ThemeToggle'

export function Header() {
  const location = useLocation();

  const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/dash": "dashboard",
    "/finances": "Controle Financeiro",
    "/habits": "Hábitos",
  };

  const currentPage = pageNames[location.pathname] || "Página Desconhecida";

  return (
    <header className="flex items-center mx-36 my-4 space-x-2 bg-background/80 dark:border backdrop-blur-sm rounded-lg p-2 shadow-lg z-50">
      <div className="hidden md:flex">
        <a className="flex items-center space-x-2" href="/">
          <Sparkles className="mx-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Web Planner
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </a>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <nav className="flex items-center space-x-2">
          <ThemeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/lviana15.png" alt="@lviana15" />
            <AvatarFallback>LV</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  )
}
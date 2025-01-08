import { Bell } from 'lucide-react'
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import ThemeToggle from '../floatingMenu/ components/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Web Planner
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[200px] lg:w-[300px]"
            />
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/lviana15.png" alt="@lviana15" />
              <AvatarFallback>LV</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  )
}


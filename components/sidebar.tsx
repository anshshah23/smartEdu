"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, Home, Image, LogOut, MessageSquare, PenTool, Settings, User, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/authContext"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Whiteboard", href: "/whiteboard", icon: PenTool },
  { name: "Image Learning", href: "/image-learning", icon: Image },
  { name: "Paint", href: "/paint", icon: PenTool },
  { name: "Video Player", href: "/video", icon: Video },
  { name: "Quizzes", href: "/quizzes", icon: BookOpen },
  { name: "Collaboration", href: "/collaboration", icon: MessageSquare },
]

const userItems = [
  { name: "Profile", href: "/settings", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]
export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <div className={cn(
      "flex flex-col h-screen w-64 border-r bg-background transition-all duration-300",
      isCollapsed ? "w-12 sm:w-16" : "w-screen sm:w-64"
    )}>
      {/* Header Section */}
      <div className="flex h-14 items-center border-b px-3 shrink-0">
        {!isCollapsed && <h1 className="text-lg font-semibold">EduPlatform</h1>}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", isCollapsed && "mx-auto")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <PenTool className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Navigation (Prevents Scrolling) */}
      <nav className="flex-1 px-2 py-4 overflow-hidden">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  isCollapsed && "justify-center px-0",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section (Fixed at Bottom) */}
      <div className="border-t p-3 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`w-full flex ${isCollapsed ? 'justify-center':'justify-start'} items-center`}>
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {!isCollapsed && <span className="ml-3">User Profile</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

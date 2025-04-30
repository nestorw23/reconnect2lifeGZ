
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { UserPlus, Home, Brain, Video, User } from "lucide-react"
import { cn } from "@/lib/utils"

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: "/register", icon: UserPlus, label: "Registro" },
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/psychometrics", icon: Brain, label: "Pruebas" },
    { path: "/sessions", icon: Video, label: "Sesiones" },
    { path: "/profile", icon: User, label: "Perfil" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <item.icon
              className={cn(
                "w-6 h-6",
                location.pathname === item.path
                  ? "bottom-nav-active"
                  : "bottom-nav-inactive"
              )}
            />
            <span
              className={cn(
                "text-xs mt-1",
                location.pathname === item.path
                  ? "bottom-nav-active"
                  : "bottom-nav-inactive"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav

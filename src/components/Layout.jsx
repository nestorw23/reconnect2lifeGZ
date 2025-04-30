
import React from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import BottomNav from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

function Layout() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      })
      navigate("/login")
    } catch (error) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="fixed top-0 right-0 m-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          title="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout

import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { UserPlus, KeyRound, Save, GraduationCap, Briefcase } from "lucide-react"

function RecordPersonalDataFamilyMember() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({})
  const { toast } = useToast()

  const handleSave = () => {
    navigate('/home-family')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-card rounded-xl shadow-lg p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Registro de Datos</h1>
              <p className="text-muted-foreground mt-1">Familiar</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base">Nombre completo</Label>
              <input
                id="fullName"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.fullName || ""}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base">Edad</Label>
              <input
                id="age"
                type="number"
                min="0"
                max="120"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.age || ""}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Ingresa tu edad"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="education" className="text-base">Nivel educativo</Label>
              </div>
              <select
                id="education"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.education || ""}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              >
                <option value="">Selecciona tu nivel educativo</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Posgrado">Posgrado</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="occupation" className="text-base">Ocupación actual</Label>
              </div>
              <input
                id="occupation"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.occupation || ""}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="Ingresa tu ocupación actual"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="linkKey" className="text-base">Key de Vinculación del Familiar en Recuperación</Label>
              </div>
              <input
                id="linkKey"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.linkKey || ""}
                onChange={(e) => setFormData({ ...formData, linkKey: e.target.value })}
                placeholder="Ingresa la key de vinculación"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Esta clave te permitirá vincular tu cuenta con tu familiar en recuperación.
              </p>
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full h-12 text-lg mt-6"
              size="lg"
            >
              <Save className="mr-2 h-5 w-5" />
              Guardar y Vincular
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RecordPersonalDataFamilyMember

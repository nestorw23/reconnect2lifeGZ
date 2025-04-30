import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import RecordPersonalDataForm from "@/components/RecordPersonalDataForm"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { UserPlus, KeyRound, Save } from "lucide-react"

function RecordPersonalDataConsumerResidentialTreatment() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({})
  const { toast } = useToast()

  const handleSave = () => {
    navigate('/')
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
              <p className="text-muted-foreground mt-1">Tratamiento Residencial</p>
            </div>
          </div>

          <div className="space-y-6">
            <RecordPersonalDataForm 
              values={formData}
              onChange={setFormData}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <KeyRound className="h-5 w-5 text-primary" />
                </div>
                <Label htmlFor="linkKey" className="text-base font-medium">
                  Key de Vinculación
                </Label>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Esta clave se generará automáticamente y te permitirá vincular tu cuenta con tus familiares y terapeutas.
              </p>
              <input
                id="linkKey"
                type="text"
                value="[KEY_PLACEHOLDER]"
                disabled
                className="w-full px-4 py-3 bg-muted rounded-lg border border-border text-muted-foreground"
              />
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Save className="mr-2 h-5 w-5" />
              Guardar Datos
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RecordPersonalDataConsumerResidentialTreatment

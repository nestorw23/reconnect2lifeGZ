import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Building2, FileText, Save, AlertCircle, Mail, Phone, MapPin } from "lucide-react"

function RecordPersonalDataResidencia() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({})
  const [acceptedTerms, setAcceptedTerms] = React.useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    navigate('/home-residencia')
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
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Registro de Datos</h1>
              <p className="text-muted-foreground mt-1">Residencia</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Nombre de la residencia</Label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ingresa el nombre de la residencia"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="rfc" className="text-base">RFC</Label>
              </div>
              <input
                id="rfc"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.rfc || ""}
                onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
                placeholder="Ingresa el RFC de la residencia"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="email" className="text-base">Correo electrónico</Label>
              </div>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ingresa el correo electrónico de la residencia"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="phone" className="text-base">Teléfono</Label>
              </div>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ingresa el número de teléfono de la residencia"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="address" className="text-base">Dirección</Label>
              </div>
              <input
                id="address"
                type="text"
                className="w-full rounded-lg border border-input px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Ingresa la dirección de la residencia"
              />
            </div>

            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Consideraciones legales y éticas</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                La residencia, como contratante directa, debe encargarse de solicitar y validar toda la documentación necesaria para cumplir con las obligaciones fiscales, laborales y profesionales (como RFC, CURP, comprobantes fiscales, contratos, etc. Del terapeuta). ReConnect2Life no maneja datos sensibles o personales del terapeuta que trabaja en un residencia por lo tanto no asume responsabilidades legales relacionadas con la privacidad, manejo de datos o cumplimiento fiscal. En cuanto a la confidencialidad y manejo de información clínica, es responsabilidad del psicólogo y la residencia cumplir con la normatividad aplicable (NOM-024-SSA3-2012, NOM-004-SSA3-2012, LFPDPPP, NOM-168-SSA1-1998).
              </p>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm">
                Acepto las consideraciones legales y éticas
              </Label>
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full h-12 text-lg"
              size="lg"
              disabled={!acceptedTerms}
            >
              <Save className="mr-2 h-5 w-5" />
              Guardar Registro
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RecordPersonalDataResidencia 
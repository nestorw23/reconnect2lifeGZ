
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

function RecordPersonalDataResidence() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({})
  const { toast } = useToast()

  const handleSave = () => {
    navigate('/home-residence')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Registro de Datos - Residencia</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rfc">RFC (Registro Federal de Contribuyentes)</Label>
          <input
            id="rfc"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.rfc || ""}
            onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo o razón social</Label>
          <input
            id="fullName"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.fullName || ""}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Código postal del domicilio fiscal</Label>
          <input
            id="postalCode"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.postalCode || ""}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fiscalRegime">Régimen fiscal bajo el que tributa</Label>
          <select
            id="fiscalRegime"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.fiscalRegime || ""}
            onChange={(e) => setFormData({ ...formData, fiscalRegime: e.target.value })}
          >
            <option value="">Selecciona una opción</option>
            <option value="601">General de Ley Personas Morales</option>
            <option value="603">Personas Morales con Fines no Lucrativos</option>
            <option value="612">Personas Físicas con Actividades Empresariales y Profesionales</option>
            <option value="626">Régimen Simplificado de Confianza</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cfdiUse">Uso del CFDI</Label>
          <select
            id="cfdiUse"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.cfdiUse || ""}
            onChange={(e) => setFormData({ ...formData, cfdiUse: e.target.value })}
          >
            <option value="">Selecciona una opción</option>
            <option value="G01">Adquisición de mercancías</option>
            <option value="G03">Gastos en general</option>
            <option value="P01">Por definir</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico para envío digital</Label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fiscalAddress">Domicilio fiscal completo</Label>
          <textarea
            id="fiscalAddress"
            className="w-full rounded-md border border-input px-3 py-2 min-h-[100px]"
            value={formData.fiscalAddress || ""}
            onChange={(e) => setFormData({ ...formData, fiscalAddress: e.target.value })}
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Guardar Registro
        </Button>
      </div>
    </div>
  )
}

export default RecordPersonalDataResidence

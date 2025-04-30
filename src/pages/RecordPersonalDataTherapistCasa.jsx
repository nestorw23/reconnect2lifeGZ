
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

function RecordPersonalDataTherapistCasa() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({})
  const [acceptedContract, setAcceptedContract] = React.useState(false)
  const [acceptedBilling, setAcceptedBilling] = React.useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    navigate('/home-therapist')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Registro de Datos - Terapeuta (Desde Casa)</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rfc">Registro Federal de Contribuyentes (RFC)</Label>
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
          <Label htmlFor="curp">Clave Única de Registro de Población (CURP)</Label>
          <input
            id="curp"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.curp || ""}
            onChange={(e) => setFormData({ ...formData, curp: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxStatus">Constancia de situación fiscal actualizada emitida por el SAT</Label>
          <input
            id="taxStatus"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.taxStatus || ""}
            onChange={(e) => setFormData({ ...formData, taxStatus: e.target.value })}
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

        <div className="space-y-2">
          <Label htmlFor="officialId">Copia de identificación oficial vigente</Label>
          <input
            id="officialId"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.officialId || ""}
            onChange={(e) => setFormData({ ...formData, officialId: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalLicense">Cédula profesional, título o comprobante del último grado de estudios</Label>
          <input
            id="professionalLicense"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.professionalLicense || ""}
            onChange={(e) => setFormData({ ...formData, professionalLicense: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Currículum Vitae actualizado</Label>
          <input
            id="cv"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.cv || ""}
            onChange={(e) => setFormData({ ...formData, cv: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="proofOfAddress">Comprobante de domicilio reciente</Label>
          <input
            id="proofOfAddress"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.proofOfAddress || ""}
            onChange={(e) => setFormData({ ...formData, proofOfAddress: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankInfo">Datos bancarios (Número de cuenta y CLABE interbancaria)</Label>
          <input
            id="bankInfo"
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={formData.bankInfo || ""}
            onChange={(e) => setFormData({ ...formData, bankInfo: e.target.value })}
          />
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Documentación que deberá marcar como aceptada para poder ingresar a brindar tratamiento en la plataforma: Contrato de prestación de servicios profesionales que incluya: Descripción detallada de las actividades a realizar. Monto y forma de pago (fecha, método, si incluye impuestos). Duración del contrato y fechas de inicio y término. Obligaciones y responsabilidades de ambas partes.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="contractTerms" 
            checked={acceptedContract}
            onCheckedChange={setAcceptedContract}
          />
          <Label htmlFor="contractTerms">
            Acepto los términos del contrato
          </Label>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Documentación para el trámite y pago: Cada que brinde atención a Personas en recuperación deberá emitir una Factura electrónica (CFDI) que cumpla con los requisitos fiscales, incluyendo desglose de IVA y retenciones correspondientes para que su pago sea generado. Cuando emita su factura se generará un recibo o comprobante de honorarios que ampare el pago realizado.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="billingTerms" 
            checked={acceptedBilling}
            onCheckedChange={setAcceptedBilling}
          />
          <Label htmlFor="billingTerms">
            Entiendo los requisitos de facturación y pago
          </Label>
        </div>

        <Button onClick={handleSave} className="w-full">
          Guardar Registro
        </Button>
      </div>
    </div>
  )
}

export default RecordPersonalDataTherapistCasa

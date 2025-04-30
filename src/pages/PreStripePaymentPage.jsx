
import React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Lock } from "lucide-react"

function PreStripePaymentPage() {
  const [discountCode, setDiscountCode] = React.useState("")
  const { toast } = useToast()
  
  // Placeholder values - these would come from props or context in a real implementation
  const originalPrice = 2159.52
  const discountAmount = 520.00
  const finalPrice = originalPrice - discountAmount

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un código de descuento",
        variant: "destructive",
      })
      return
    }
    
    // Placeholder for discount code validation
    toast({
      title: "Procesando",
      description: "Verificando código de descuento...",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Confirmación de Pago y Descuentos</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-6">
          <Label htmlFor="discountCode" className="text-sm font-medium mb-2 block">
            ¿Tienes un cupón de descuento?
          </Label>
          <div className="flex gap-2">
            <input
              type="text"
              id="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Ingresa tu código"
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button 
              onClick={handleApplyDiscount}
              className="whitespace-nowrap"
            >
              Aplicar
            </Button>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Precio Original:</span>
            <span className="font-medium">MX$ {originalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-green-600">
            <span>Descuento Aplicado:</span>
            <span>-MX$ {discountAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
            <span>Precio Final:</span>
            <span>MX$ {finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
        onClick={() => {
          toast({
            title: "Procesando",
            description: "Redirigiendo al proceso de pago...",
          })
        }}
      >
        Proceder al Pago
      </Button>

      <div className="mt-4 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Pago seguro procesado por Stripe</span>
        </div>
        <p className="text-sm text-gray-500">
          Garantía de reembolso de 30 días
        </p>
      </div>
    </div>
  )
}

export default PreStripePaymentPage

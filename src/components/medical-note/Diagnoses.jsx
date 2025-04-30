
import React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const commonDiagnoses = [
  "Sx. Supresión Etílica",
  "Trastorno por Consumo de Alcohol",
  "Trastorno por Consumo de Metanfetamina (Cristal)",
  "IVU",
  "Deshidratación",
  "DM2",
  "HAS"
]

function Diagnoses({ diagnoses, setDiagnoses }) {
  const [newDiagnosis, setNewDiagnosis] = React.useState("")

  const handleAddDiagnosis = (e) => {
    e.preventDefault()
    if (newDiagnosis.trim()) {
      setDiagnoses(prev => [...prev, newDiagnosis.trim()])
      setNewDiagnosis("")
    }
  }

  const handleQuickAdd = (diagnosis) => {
    if (!diagnoses.includes(diagnosis)) {
      setDiagnoses(prev => [...prev, diagnosis])
    }
  }

  const handleRemoveDiagnosis = (index) => {
    setDiagnoses(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Diagnósticos</h3>
      
      <form onSubmit={handleAddDiagnosis} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newDiagnosis}
          onChange={(e) => setNewDiagnosis(e.target.value)}
          placeholder="Agregar diagnóstico..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Agregar
        </button>
      </form>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Diagnósticos Frecuentes</h4>
        <div className="flex flex-wrap gap-2">
          {commonDiagnoses.map((diagnosis) => (
            <Button
              key={diagnosis}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(diagnosis)}
              className="text-sm"
            >
              {diagnosis}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {diagnoses.map((diagnosis, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full"
          >
            <span>{diagnosis}</span>
            <button
              onClick={() => handleRemoveDiagnosis(index)}
              className="hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagnoses

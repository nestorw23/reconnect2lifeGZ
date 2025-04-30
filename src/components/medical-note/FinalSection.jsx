
import React from "react"
import { Button } from "@/components/ui/button"

function FinalSection({ prognosis, comments, handleChange }) {
  const addThanks = () => {
    handleChange("additionalComments", comments ? `${comments}\nGracias.` : "Gracias.")
  }

  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Pronóstico</label>
          <select
            value={prognosis}
            onChange={(e) => handleChange("prognosis", e.target.value)}
            className="w-full p-2 border rounded mt-1"
            defaultValue="Reservado a evolución"
          >
            <option value="">Seleccione pronóstico</option>
            <option value="Bueno para la vida y función">Bueno para la vida y función</option>
            <option value="Reservado a evolución">Reservado a evolución</option>
            <option value="Malo para la función">Malo para la función</option>
            <option value="Malo para la vida">Malo para la vida</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Comentarios Adicionales</label>
          <div className="space-y-2">
            <textarea
              value={comments}
              onChange={(e) => handleChange("additionalComments", e.target.value)}
              className="w-full p-2 border rounded mt-1 h-24"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addThanks}
              className="w-full"
            >
              Insertar "Gracias."
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalSection

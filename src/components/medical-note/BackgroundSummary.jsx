
import React from "react"

function BackgroundSummary({ background, handleBackgroundChange }) {
  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Resumen de Antecedentes</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Antecedentes Pertinentes</label>
          <textarea
            value={background.relevant}
            onChange={(e) => handleBackgroundChange("relevant", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Resumen de antecedentes relevantes para el caso actual..."
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Internamientos Previos (Adicciones)</label>
          <textarea
            value={background.previousAdmissions}
            onChange={(e) => handleBackgroundChange("previousAdmissions", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Historia de internamientos previos por adicciones..."
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Enfermedades Crónico-Degenerativas</label>
          <textarea
            value={background.chronicDiseases}
            onChange={(e) => handleBackgroundChange("chronicDiseases", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Lista y estado actual de enfermedades crónicas..."
          />
        </div>
      </div>
    </div>
  )
}

export default BackgroundSummary

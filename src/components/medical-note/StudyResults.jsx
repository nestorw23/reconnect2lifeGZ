
import React from "react"

function StudyResults({ results, handleResultsChange }) {
  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Resultados de Estudios Relevantes</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Laboratorio</label>
          <textarea
            value={results.laboratory}
            onChange={(e) => handleResultsChange("laboratory", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-32"
            placeholder="Resumen de resultados de laboratorio relevantes..."
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Gabinete</label>
          <textarea
            value={results.imaging}
            onChange={(e) => handleResultsChange("imaging", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-32"
            placeholder="Resumen de resultados de estudios de gabinete..."
          />
        </div>
      </div>
    </div>
  )
}

export default StudyResults

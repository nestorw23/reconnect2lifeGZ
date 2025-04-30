
import React, { useEffect } from "react"

function VitalSigns({ vitals, handleVitalsChange }) {
  // Calcular IMC cuando cambie peso o talla
  useEffect(() => {
    if (vitals.weight && vitals.height) {
      const heightInMeters = parseFloat(vitals.height)
      const weightInKg = parseFloat(vitals.weight)
      if (heightInMeters > 0) {
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
        handleVitalsChange("bmi", bmi)
      }
    }
  }, [vitals.weight, vitals.height])

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Signos Vitales</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm">FC (lpm)</label>
          <input
            type="number"
            placeholder="lpm"
            value={vitals.heartRate}
            onChange={(e) => handleVitalsChange("heartRate", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">FR (rpm)</label>
          <input
            type="number"
            placeholder="rpm"
            value={vitals.respiratoryRate}
            onChange={(e) => handleVitalsChange("respiratoryRate", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">SpO2 (%)</label>
          <input
            type="number"
            placeholder="%"
            value={vitals.spo2}
            onChange={(e) => handleVitalsChange("spo2", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="text-sm">TA (mmHg)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Sistólica"
              value={vitals.bloodPressureSys}
              onChange={(e) => handleVitalsChange("bloodPressureSys", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Diastólica"
              value={vitals.bloodPressureDia}
              onChange={(e) => handleVitalsChange("bloodPressureDia", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="text-sm">Temp (°C)</label>
          <input
            type="number"
            step="0.1"
            placeholder="°C"
            value={vitals.temperature}
            onChange={(e) => handleVitalsChange("temperature", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="kg"
            value={vitals.weight}
            onChange={(e) => handleVitalsChange("weight", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Talla (m)</label>
          <input
            type="number"
            step="0.01"
            placeholder="m"
            value={vitals.height}
            onChange={(e) => handleVitalsChange("height", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">IMC</label>
          <input
            type="text"
            value={vitals.bmi || ""}
            readOnly
            className="w-full p-2 bg-muted border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Glucemia (mg/dL)</label>
          <input
            type="number"
            placeholder="mg/dL"
            value={vitals.glucose}
            onChange={(e) => handleVitalsChange("glucose", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default VitalSigns

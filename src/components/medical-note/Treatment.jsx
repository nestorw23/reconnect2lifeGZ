
import React from "react"
import { Button } from "@/components/ui/button"

const commonMedications = [
  {
    name: "Complejo B",
    dose: "1",
    unit: "amp",
    route: "IM",
    frequency: "c/24h",
    duration: "x 5 días"
  },
  {
    name: "Tiamina",
    dose: "100",
    unit: "mg",
    route: "IM",
    frequency: "c/24h",
    duration: "x 5 días"
  },
  {
    name: "Diazepam",
    dose: "10",
    unit: "mg",
    route: "VO",
    frequency: "c/8h",
    duration: "x 3 días"
  },
  {
    name: "Omeprazol",
    dose: "20",
    unit: "mg",
    route: "VO",
    frequency: "c/24h",
    duration: "Durante internamiento"
  },
  {
    name: "Paroxetina",
    dose: "20",
    unit: "mg",
    route: "VO",
    frequency: "1-0-0",
    duration: "Valorar continuidad"
  }
]

const dietOptions = [
  "Normal",
  "Blanda",
  "Diabético 1800kcal",
  "Diabético 2000kcal",
  "Líquidos abundantes",
  "Otra (especificar)"
]

const commonInstructions = [
  { id: "program", text: "Apego al programa", defaultChecked: true },
  { id: "withdrawal", text: "Vigilar datos de abstinencia / Escala CIWA" },
  { id: "report", text: "Reportar eventualidades", defaultChecked: true },
  { id: "continue", text: "Continuar manejo indicado" }
]

function Treatment({ treatment, handleTreatmentChange, addMedication, removeMedication }) {
  const handleAddCommonMedication = (med) => {
    handleTreatmentChange("medications", treatment.medications.length, null, {
      ...med
    })
  }

  const [selectedInstructions, setSelectedInstructions] = React.useState(
    commonInstructions.reduce((acc, inst) => ({
      ...acc,
      [inst.id]: inst.defaultChecked || false
    }), {})
  )

  const handleInstructionChange = (id, checked) => {
    setSelectedInstructions(prev => ({ ...prev, [id]: checked }))
    const instructions = commonInstructions
      .filter(inst => (inst.id === id ? checked : prev[inst.id]))
      .map(inst => inst.text)
      .join("\n")
    handleTreatmentChange("nursingInstructions", null, null, instructions)
  }

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Plan de Tratamiento</h3>

      {/* Medicamentos */}
      <div className="mb-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Medicamentos</h4>
            <Button onClick={addMedication} variant="outline" size="sm">
              Añadir Medicamento
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {commonMedications.map((med, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleAddCommonMedication(med)}
              >
                {med.name}
              </Button>
            ))}
          </div>
        </div>
        
        {treatment.medications.map((med, index) => (
          <div key={index} className="mb-4 p-3 bg-muted rounded-lg">
            <div className="grid grid-cols-6 gap-2">
              <input
                className="col-span-2 p-2 border rounded"
                placeholder="Nombre"
                value={med.name}
                onChange={(e) => handleTreatmentChange("medications", index, "name", e.target.value)}
              />
              <input
                type="number"
                className="p-2 border rounded"
                placeholder="Dosis"
                value={med.dose}
                onChange={(e) => handleTreatmentChange("medications", index, "dose", e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={med.unit}
                onChange={(e) => handleTreatmentChange("medications", index, "unit", e.target.value)}
              >
                <option value="">Unidad</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="UI">UI</option>
                <option value="ml">ml</option>
                <option value="amp">amp</option>
              </select>
              <select
                className="p-2 border rounded"
                value={med.route}
                onChange={(e) => handleTreatmentChange("medications", index, "route", e.target.value)}
              >
                <option value="">Vía</option>
                <option value="VO">VO</option>
                <option value="IV">IV</option>
                <option value="IM">IM</option>
                <option value="SC">SC</option>
                <option value="SL">SL</option>
                <option value="Tópica">Tópica</option>
              </select>
              <select
                className="p-2 border rounded"
                value={med.frequency}
                onChange={(e) => handleTreatmentChange("medications", index, "frequency", e.target.value)}
              >
                <option value="">Frecuencia</option>
                <option value="c/24h">c/24h</option>
                <option value="c/12h">c/12h</option>
                <option value="c/8h">c/8h</option>
                <option value="c/6h">c/6h</option>
                <option value="c/4h">c/4h</option>
                <option value="1-0-0">1-0-0</option>
                <option value="Dosis Única">Dosis Única</option>
                <option value="PRN">PRN</option>
              </select>
            </div>
            <div className="flex justify-between mt-2">
              <input
                className="flex-1 p-2 border rounded mr-2"
                placeholder="Duración"
                value={med.duration}
                onChange={(e) => handleTreatmentChange("medications", index, "duration", e.target.value)}
              />
              <Button
                onClick={() => removeMedication(index)}
                variant="destructive"
                size="sm"
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Tratamiento Psicoterapéutico */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Tratamiento Psicoterapéutico/Psicológico</h4>
        <textarea
          value={treatment.psychotherapy}
          onChange={(e) => handleTreatmentChange("psychotherapy", null, null, e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="Especifique el plan de tratamiento psicoterapéutico..."
        />
      </div>

      {/* Estudios e Interconsultas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Labs */}
        <div>
          <h4 className="font-medium mb-2">Estudios de Laboratorio</h4>
          <div className="space-y-2">
            {Object.entries(treatment.labs).map(([key, value]) => 
              key !== "other" ? (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleTreatmentChange("labs", null, key, e.target.checked)}
                    className="mr-2"
                  />
                  {key.toUpperCase()}
                </label>
              ) : null
            )}
            <input
              type="text"
              placeholder="Otros Labs"
              value={treatment.labs.other}
              onChange={(e) => handleTreatmentChange("labs", null, "other", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Gabinete */}
        <div>
          <h4 className="font-medium mb-2">Estudios de Gabinete</h4>
          <div className="space-y-2">
            {Object.entries(treatment.imaging).map(([key, value]) =>
              key !== "other" ? (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleTreatmentChange("imaging", null, key, e.target.checked)}
                    className="mr-2"
                  />
                  {key === "chestXray" ? "Rx Tórax" : key.toUpperCase()}
                </label>
              ) : null
            )}
            <input
              type="text"
              placeholder="Otros Estudios"
              value={treatment.imaging.other}
              onChange={(e) => handleTreatmentChange("imaging", null, "other", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Interconsultas */}
        <div>
          <h4 className="font-medium mb-2">Interconsultas</h4>
          <div className="space-y-2">
            {Object.entries(treatment.consults).map(([key, value]) =>
              key !== "other" ? (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleTreatmentChange("consults", null, key, e.target.checked)}
                    className="mr-2"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ) : null
            )}
            <input
              type="text"
              placeholder="Otras Interconsultas"
              value={treatment.consults.other}
              onChange={(e) => handleTreatmentChange("consults", null, "other", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Dieta e Indicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Dieta</label>
          <select
            value={treatment.diet}
            onChange={(e) => handleTreatmentChange("diet", null, null, e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Seleccione dieta</option>
            {dietOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {treatment.diet === "Otra (especificar)" && (
            <input
              type="text"
              placeholder="Especifique la dieta..."
              className="w-full p-2 border rounded mt-2"
              onChange={(e) => handleTreatmentChange("diet", null, null, e.target.value)}
            />
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Indicaciones de Enfermería</label>
          <div className="space-y-2 mb-2">
            {commonInstructions.map(instruction => (
              <label key={instruction.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedInstructions[instruction.id]}
                  onChange={(e) => handleInstructionChange(instruction.id, e.target.checked)}
                  className="mr-2"
                />
                {instruction.text}
              </label>
            ))}
          </div>
          <textarea
            value={treatment.nursingInstructions}
            onChange={(e) => handleTreatmentChange("nursingInstructions", null, null, e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Indicaciones adicionales..."
          />
        </div>
      </div>
    </div>
  )
}

export default Treatment

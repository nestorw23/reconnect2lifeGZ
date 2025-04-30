
import React from "react"
import { Button } from "@/components/ui/button"

const systemLabels = {
  headNeck: "Cabeza y Cuello",
  thoraxCardio: "Tórax Cardiovascular",
  thoraxResp: "Tórax Respiratorio",
  abdomen: "Abdomen",
  extremities: "Extremidades",
  neurological: "Neurológico",
  skin: "Piel y Tegumentos"
}

const normalFindings = {
  headNeck: "Normocefalo, pupilas isocóricas normorreflécticas, narinas permeables, mucosas orales hidratadas, cuello cilíndrico sin masas ni adenomegalias.",
  thoraxCardio: "Ruidos cardiacos rítmicos, de buen tono e intensidad, sin soplos ni fenómenos agregados.",
  thoraxResp: "Campos pulmonares bien ventilados, murmullo vesicular conservado, sin estertores ni sibilancias.",
  abdomen: "Blando, depresible, no doloroso a la palpación, peristalsis presente, sin visceromegalias ni datos de irritación peritoneal.",
  extremities: "Íntegras, simétricas, eutróficas, con pulsos distales presentes, llenado capilar normal, sin edema.",
  neurological: "Alerta, orientado en tiempo, lugar y persona, lenguaje coherente, sin datos de focalización neurológica.",
  skin: "Piel hidratada, con turgencia conservada, sin lesiones dérmicas agudas."
}

function PhysicalExam({ exam, handleExamChange }) {
  const insertNormalFindings = (system) => {
    handleExamChange(system, "findings", normalFindings[system])
  }

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="font-medium mb-4">Exploración Física</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Habitus Exterior</label>
          <textarea
            value={exam.habitus}
            onChange={(e) => handleExamChange("habitus", e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Consciente, orientado, cooperador, tranquilo, con adecuada coloración e hidratación..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(exam.systems).map(([system, data]) => (
            <div key={system} className="space-y-2 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <label className="font-medium">{systemLabels[system]}</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={data.normal}
                    onChange={(e) => handleExamChange(system, "normal", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Normal</span>
                </div>
              </div>
              {!data.normal && (
                <div className="space-y-2">
                  <textarea
                    placeholder={normalFindings[system]}
                    value={data.findings}
                    onChange={(e) => handleExamChange(system, "findings", e.target.value)}
                    className="w-full p-2 border rounded h-20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertNormalFindings(system)}
                    className="w-full"
                  >
                    Insertar Descripción Normal
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhysicalExam


import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Printer } from "lucide-react"

function MedicalNote() {
  const { toast } = useToast()
  const [note, setNote] = useState({
    date: new Date().toISOString().slice(0, 16),
    encounterType: "",
    patientName: "",
    vitals: {
      heartRate: "",
      respiratoryRate: "",
      bloodPressureSys: "",
      bloodPressureDia: "",
      temperature: "",
      weight: "",
      height: "",
      glucose: ""
    },
    physicalExam: {
      habitus: "",
      systems: {
        headNeck: { normal: true, findings: "" },
        cardiopulmonary: { normal: true, findings: "" },
        abdomen: { normal: true, findings: "" },
        extremities: { normal: true, findings: "" },
        neurological: { normal: true, findings: "" }
      }
    },
    diagnoses: "",
    treatment: {
      medications: [],
      labs: {
        cbc: false,
        metabolicPanel: false,
        urinalysis: false,
        liverFunction: false,
        electrolytes: false,
        other: ""
      },
      imaging: {
        chestXray: false,
        ekg: false,
        other: ""
      },
      consults: {
        psychology: false,
        socialWork: false,
        nutrition: false,
        other: ""
      },
      diet: "",
      nursingInstructions: ""
    },
    prognosis: "",
    additionalComments: ""
  })

  const handleVitalsChange = (field, value) => {
    setNote(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value
      }
    }))
  }

  const handleSystemChange = (system, field, value) => {
    setNote(prev => ({
      ...prev,
      physicalExam: {
        ...prev.physicalExam,
        systems: {
          ...prev.physicalExam.systems,
          [system]: {
            ...prev.physicalExam.systems[system],
            [field]: value
          }
        }
      }
    }))
  }

  const addMedication = () => {
    setNote(prev => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: [
          ...prev.treatment.medications,
          { name: "", dose: "", unit: "", route: "", frequency: "", duration: "" }
        ]
      }
    }))
  }

  const removeMedication = (index) => {
    setNote(prev => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: prev.treatment.medications.filter((_, i) => i !== index)
      }
    }))
  }

  const handleMedicationChange = (index, field, value) => {
    setNote(prev => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: prev.treatment.medications.map((med, i) =>
          i === index ? { ...med, [field]: value } : med
        )
      }
    }))
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Nota de Evolución Médica</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 18px; margin-bottom: 20px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 5px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>Nota de Evolución Médica - ${new Date(note.date).toLocaleString()}</h1>
          
          <div class="section">
            <div class="section-title">Tipo de Encuentro:</div>
            ${note.encounterType}
          </div>

          <div class="section">
            <div class="section-title">Paciente:</div>
            ${note.patientName}
          </div>

          <div class="section">
            <div class="section-title">Signos Vitales:</div>
            <table>
              <tr>
                <td>FC: ${note.vitals.heartRate} lpm</td>
                <td>FR: ${note.vitals.respiratoryRate} rpm</td>
                <td>TA: ${note.vitals.bloodPressureSys}/${note.vitals.bloodPressureDia} mmHg</td>
              </tr>
              <tr>
                <td>Temp: ${note.vitals.temperature} °C</td>
                <td>Peso: ${note.vitals.weight} kg</td>
                <td>Talla: ${note.vitals.height} m</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Exploración Física:</div>
            <div>Habitus: ${note.physicalExam.habitus}</div>
            ${Object.entries(note.physicalExam.systems).map(([system, data]) => `
              <div>${system}: ${data.normal ? 'Normal' : data.findings}</div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Diagnósticos:</div>
            ${note.diagnoses}
          </div>

          <div class="section">
            <div class="section-title">Plan de Tratamiento:</div>
            <div>Medicamentos:</div>
            ${note.treatment.medications.map(med => `
              <div>${med.name} ${med.dose}${med.unit} ${med.route} ${med.frequency} ${med.duration}</div>
            `).join('')}
            
            <div>Estudios de Laboratorio:</div>
            ${Object.entries(note.treatment.labs).map(([lab, value]) => 
              typeof value === 'boolean' ? 
                value ? `<div>${lab}</div>` : '' : 
                value ? `<div>Otros: ${value}</div>` : ''
            ).join('')}

            <div>Estudios de Gabinete:</div>
            ${Object.entries(note.treatment.imaging).map(([study, value]) => 
              typeof value === 'boolean' ? 
                value ? `<div>${study}</div>` : '' : 
                value ? `<div>Otros: ${value}</div>` : ''
            ).join('')}

            <div>Interconsultas:</div>
            ${Object.entries(note.treatment.consults).map(([consult, value]) => 
              typeof value === 'boolean' ? 
                value ? `<div>${consult}</div>` : '' : 
                value ? `<div>Otras: ${value}</div>` : ''
            ).join('')}

            <div>Dieta: ${note.treatment.diet}</div>
            <div>Indicaciones de Enfermería: ${note.treatment.nursingInstructions}</div>
          </div>

          <div class="section">
            <div class="section-title">Pronóstico:</div>
            ${note.prognosis}
          </div>

          <div class="section">
            <div class="section-title">Comentarios Adicionales:</div>
            ${note.additionalComments}
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar la nota
    toast({
      title: "Nota guardada",
      description: "La nota de evolución se ha guardado correctamente"
    })
  }

  return (
    <div className="space-y-6">
      {/* Identificación y Contexto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="datetime-local"
          value={note.date}
          onChange={(e) => setNote(prev => ({ ...prev, date: e.target.value }))}
          className="p-2 border rounded"
        />
        <select
          value={note.encounterType}
          onChange={(e) => setNote(prev => ({ ...prev, encounterType: e.target.value }))}
          className="p-2 border rounded"
        >
          <option value="">Tipo de Encuentro</option>
          <option value="Valoración Inicial">Valoración Inicial</option>
          <option value="Seguimiento">Seguimiento</option>
          <option value="Interconsulta">Interconsulta</option>
          <option value="Egreso">Egreso</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Nombre del Paciente"
        value={note.patientName}
        onChange={(e) => setNote(prev => ({ ...prev, patientName: e.target.value }))}
        className="w-full p-2 border rounded"
      />

      {/* Signos Vitales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm">FC (lpm)</label>
          <input
            type="number"
            placeholder="lpm"
            value={note.vitals.heartRate}
            onChange={(e) => handleVitalsChange("heartRate", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">FR (rpm)</label>
          <input
            type="number"
            placeholder="rpm"
            value={note.vitals.respiratoryRate}
            onChange={(e) => handleVitalsChange("respiratoryRate", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm">TA (mmHg)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Sistólica"
              value={note.vitals.bloodPressureSys}
              onChange={(e) => handleVitalsChange("bloodPressureSys", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Diastólica"
              value={note.vitals.bloodPressureDia}
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
            value={note.vitals.temperature}
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
            value={note.vitals.weight}
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
            value={note.vitals.height}
            onChange={(e) => handleVitalsChange("height", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Glucemia (mg/dL)</label>
          <input
            type="number"
            placeholder="mg/dL"
            value={note.vitals.glucose}
            onChange={(e) => handleVitalsChange("glucose", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Exploración Física */}
      <div className="space-y-4">
        <h3 className="font-medium">Exploración Física</h3>
        
        <div>
          <label className="text-sm">Habitus Exterior</label>
          <textarea
            value={note.physicalExam.habitus}
            onChange={(e) => setNote(prev => ({
              ...prev,
              physicalExam: { ...prev.physicalExam, habitus: e.target.value }
            }))}
            className="w-full p-2 border rounded h-24"
          />
        </div>

        {Object.entries(note.physicalExam.systems).map(([system, data]) => (
          <div key={system} className="flex items-start space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={data.normal}
                onChange={(e) => handleSystemChange(system, "normal", e.target.checked)}
                className="mr-2"
              />
              <label>{system} Normal</label>
            </div>
            {!data.normal && (
              <input
                type="text"
                placeholder="Hallazgos"
                value={data.findings}
                onChange={(e) => handleSystemChange(system, "findings", e.target.value)}
                className="flex-1 p-2 border rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Diagnósticos */}
      <div>
        <label className="text-sm">Diagnósticos</label>
        <textarea
          value={note.diagnoses}
          onChange={(e) => setNote(prev => ({ ...prev, diagnoses: e.target.value }))}
          className="w-full p-2 border rounded h-24"
          placeholder="Ingrese los diagnósticos separados por líneas"
        />
      </div>

      {/* Plan de Tratamiento */}
      <div className="space-y-4">
        <h3 className="font-medium">Plan de Tratamiento</h3>

        {/* Medicamentos */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Medicamentos</label>
            <Button onClick={addMedication} variant="outline" size="sm">
              Añadir Medicamento
            </Button>
          </div>
          
          {note.treatment.medications.map((med, index) => (
            <div key={index} className="grid grid-cols-6 gap-2 mb-2">
              <input
                className="col-span-2 p-2 border rounded"
                placeholder="Nombre"
                value={med.name}
                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                className="p-2 border rounded"
                placeholder="Dosis"
                value={med.dose}
                onChange={(e) => handleMedicationChange(index, "dose", e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={med.unit}
                onChange={(e) => handleMedicationChange(index, "unit", e.target.value)}
              >
                <option value="">Unidad</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="UI">UI</option>
                <option value="ml">ml</option>
              </select>
              <select
                className="p-2 border rounded"
                value={med.route}
                onChange={(e) => handleMedicationChange(index, "route", e.target.value)}
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
                onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
              >
                <option value="">Frecuencia</option>
                <option value="c/24h">c/24h</option>
                <option value="c/12h">c/12h</option>
                <option value="c/8h">c/8h</option>
                <option value="c/6h">c/6h</option>
                <option value="c/4h">c/4h</option>
                <option value="Dosis Única">Dosis Única</option>
                <option value="PRN">PRN</option>
              </select>
              <input
                className="p-2 border rounded"
                placeholder="Duración"
                value={med.duration}
                onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
              />
              <Button
                onClick={() => removeMedication(index)}
                variant="destructive"
                size="sm"
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>

        {/* Estudios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Estudios de Laboratorio</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.labs.cbc}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      labs: { ...prev.treatment.labs, cbc: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                BH
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.labs.metabolicPanel}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      labs: { ...prev.treatment.labs, metabolicPanel: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                QS
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.labs.urinalysis}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      labs: { ...prev.treatment.labs, urinalysis: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                EGO
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.labs.liverFunction}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      labs: { ...prev.treatment.labs, liverFunction: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                PFH
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.labs.electrolytes}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      labs: { ...prev.treatment.labs, electrolytes: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                Electrolitos
              </label>
              <input
                type="text"
                placeholder="Otros Labs"
                value={note.treatment.labs.other}
                onChange={(e) => setNote(prev => ({
                  ...prev,
                  treatment: {
                    ...prev.treatment,
                    labs: { ...prev.treatment.labs, other: e.target.value }
                  }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Estudios de Gabinete</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.imaging.chestXray}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      imaging: { ...prev.treatment.imaging, chestXray: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                Rx Tórax
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.imaging.ekg}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      imaging: { ...prev.treatment.imaging, ekg: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                EKG
              </label>
              <input
                type="text"
                placeholder="Otros Estudios"
                value={note.treatment.imaging.other}
                onChange={(e) => setNote(prev => ({
                  ...prev,
                  treatment: {
                    ...prev.treatment,
                    imaging: { ...prev.treatment.imaging, other: e.target.value }
                  }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Interconsultas</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.consults.psychology}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      consults: { ...prev.treatment.consults, psychology: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                Psicología
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.consults.socialWork}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      consults: { ...prev.treatment.consults, socialWork: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                Trabajo Social
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={note.treatment.consults.nutrition}
                  onChange={(e) => setNote(prev => ({
                    ...prev,
                    treatment: {
                      ...prev.treatment,
                      consults: { ...prev.treatment.consults, nutrition: e.target.checked }
                    }
                  }))}
                  className="mr-2"
                />
                Nutrición
              </label>
              <input
                type="text"
                placeholder="Otras Interconsultas"
                value={note.treatment.consults.other}
                onChange={(e) => setNote(prev => ({
                  ...prev,
                  treatment: {
                    ...prev.treatment,
                    consults: { ...prev.treatment.consults, other: e.target.value }
                  }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Dieta e Indicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Dieta</label>
            <input
              type="text"
              placeholder="Ej: Blanda, Diabético 1800kcal, s/s"
              value={note.treatment.diet}
              onChange={(e) => setNote(prev => ({
                ...prev,
                treatment: { ...prev.treatment, diet: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm">Indicaciones de Enfermería</label>
            <textarea
              value={note.treatment.nursingInstructions}
              onChange={(e) => setNote(prev => ({
                ...prev,
                treatment: { ...prev.treatment, nursingInstructions: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Pronóstico y Comentarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Pronóstico</label>
          <select
            value={note.prognosis}
            onChange={(e) => setNote(prev => ({ ...prev, prognosis: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione pronóstico</option>
            <option value="Bueno para la vida y función">Bueno para la vida y función</option>
            <option value="Reservado a evolución">Reservado a evolución</option>
            <option value="Malo para la función">Malo para la función</option>
            <option value="Malo para la vida">Malo para la vida</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Comentarios Adicionales</label>
          <textarea
            value={note.additionalComments}
            onChange={(e) => setNote(prev => ({ ...prev, additionalComments: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex space-x-4">
        <Button onClick={handleSave} className="flex-1">
          Guardar Nota
        </Button>
        <Button onClick={handlePrint} variant="outline" className="flex items-center">
          <Printer className="w-4 h-4 mr-2" />
          Imprimir Nota
        </Button>
      </div>
    </div>
  )
}

export default MedicalNote

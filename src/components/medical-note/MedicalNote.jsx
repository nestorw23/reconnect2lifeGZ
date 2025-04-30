
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Printer } from "lucide-react"
import MedicalNoteHeader from "./MedicalNoteHeader"
import VitalSigns from "./VitalSigns"
import PhysicalExam from "./PhysicalExam"
import StudyResults from "./StudyResults"
import BackgroundSummary from "./BackgroundSummary"
import Diagnoses from "./Diagnoses"
import Treatment from "./Treatment"
import FinalSection from "./FinalSection"
import PrintStyles from "./PrintStyles"

function MedicalNote() {
  const { toast } = useToast()
  const [note, setNote] = useState({
    date: new Date().toISOString().slice(0, 16),
    encounterType: "",
    patientName: "",
    consultReason: "",
    vitals: {
      heartRate: "",
      respiratoryRate: "",
      bloodPressureSys: "",
      bloodPressureDia: "",
      temperature: "",
      weight: "",
      height: "",
      glucose: "",
      spo2: "",
      bmi: ""
    },
    physicalExam: {
      habitus: "",
      systems: {
        headNeck: { normal: true, findings: "" },
        thoraxCardio: { normal: true, findings: "" },
        thoraxResp: { normal: true, findings: "" },
        abdomen: { normal: true, findings: "" },
        extremities: { normal: true, findings: "" },
        neurological: { normal: true, findings: "" },
        skin: { normal: true, findings: "" }
      }
    },
    studyResults: {
      laboratory: "",
      imaging: ""
    },
    background: {
      relevant: "",
      previousAdmissions: "",
      chronicDiseases: ""
    },
    diagnoses: [], // Ensure this is initialized as an empty array
    treatment: {
      medications: [],
      psychotherapy: "",
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
    prognosis: "Reservado a evolución", // Set default value
    additionalComments: ""
  })

  // ... rest of the component code remains exactly the same ...
  
  const handleVitalsChange = (field, value) => {
    setNote(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value
      }
    }))
  }

  const handleExamChange = (system, field, value) => {
    if (field === "normal") {
      setNote(prev => ({
        ...prev,
        physicalExam: {
          ...prev.physicalExam,
          systems: {
            ...prev.physicalExam.systems,
            [system]: {
              normal: value,
              findings: value ? "" : prev.physicalExam.systems[system].findings
            }
          }
        }
      }))
    } else {
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
  }

  const handleResultsChange = (field, value) => {
    setNote(prev => ({
      ...prev,
      studyResults: {
        ...prev.studyResults,
        [field]: value
      }
    }))
  }

  const handleBackgroundChange = (field, value) => {
    setNote(prev => ({
      ...prev,
      background: {
        ...prev.background,
        [field]: value
      }
    }))
  }

  const handleTreatmentChange = (section, index, field, value) => {
    if (section === "medications") {
      setNote(prev => ({
        ...prev,
        treatment: {
          ...prev.treatment,
          medications: prev.treatment.medications.map((med, i) =>
            i === index ? { ...med, [field]: value } : med
          )
        }
      }))
    } else {
      setNote(prev => ({
        ...prev,
        treatment: {
          ...prev.treatment,
          [section]: typeof value === 'object' 
            ? { ...prev.treatment[section], [field]: value }
            : value
        }
      }))
    }
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Nota de Evolución Médica</title>
          ${PrintStyles()}
        </head>
        <body>
          <div class="header">
            <h1>Nota de Evolución Médica</h1>
            <p>Fecha: ${new Date(note.date).toLocaleString()}</p>
          </div>

          <div class="section">
            <div class="section-title">Tipo de Encuentro:</div>
            ${note.encounterType}
          </div>

          <div class="section">
            <div class="section-title">Paciente:</div>
            ${note.patientName}
          </div>

          <div class="section">
            <div class="section-title">Motivo de Consulta:</div>
            ${note.consultReason}
          </div>

          <div class="section">
            <div class="section-title">Signos Vitales:</div>
            <table>
              <tr>
                <td>FC: ${note.vitals.heartRate} lpm</td>
                <td>FR: ${note.vitals.respiratoryRate} rpm</td>
                <td>SpO2: ${note.vitals.spo2}%</td>
              </tr>
              <tr>
                <td>TA: ${note.vitals.bloodPressureSys}/${note.vitals.bloodPressureDia} mmHg</td>
                <td>Temp: ${note.vitals.temperature} °C</td>
                <td>IMC: ${note.vitals.bmi}</td>
              </tr>
              <tr>
                <td>Peso: ${note.vitals.weight} kg</td>
                <td>Talla: ${note.vitals.height} m</td>
                <td>Glucemia: ${note.vitals.glucose} mg/dL</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Antecedentes:</div>
            ${note.background.relevant && `
              <p><strong>Relevantes:</strong> ${note.background.relevant}</p>
            `}
            ${note.background.previousAdmissions && `
              <p><strong>Internamientos Previos:</strong> ${note.background.previousAdmissions}</p>
            `}
            ${note.background.chronicDiseases && `
              <p><strong>Enfermedades Crónicas:</strong> ${note.background.chronicDiseases}</p>
            `}
          </div>

          <div class="section">
            <div class="section-title">Exploración Física:</div>
            <p><strong>Habitus:</strong> ${note.physicalExam.habitus}</p>
            ${Object.entries(note.physicalExam.systems).map(([system, data]) => `
              <p><strong>${system}:</strong> ${data.normal ? 'Normal' : data.findings}</p>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Resultados de Estudios:</div>
            ${note.studyResults.laboratory && `
              <p><strong>Laboratorio:</strong> ${note.studyResults.laboratory}</p>
            `}
            ${note.studyResults.imaging && `
              <p><strong>Gabinete:</strong> ${note.studyResults.imaging}</p>
            `}
          </div>

          <div class="section">
            <div class="section-title">Diagnósticos:</div>
            ${note.diagnoses.map(dx => `
              <span class="diagnosis-tag">${dx}</span>
            `).join(' ')}
          </div>

          <div class="section">
            <div class="section-title">Plan de Tratamiento:</div>
            
            ${note.treatment.medications.length > 0 ? `
              <p><strong>Medicamentos:</strong></p>
              ${note.treatment.medications.map(med => `
                <div class="medication">
                  ${med.name} ${med.dose}${med.unit} ${med.route} ${med.frequency} ${med.duration}
                </div>
              `).join('')}
            ` : ''}

            ${note.treatment.psychotherapy && `
              <p><strong>Plan Psicoterapéutico:</strong> ${note.treatment.psychotherapy}</p>
            `}

            <p><strong>Estudios Solicitados:</strong></p>
            <ul>
              ${Object.entries(note.treatment.labs)
                .filter(([key, value]) => value && key !== 'other')
                .map(([key]) => `<li>${key.toUpperCase()}</li>`)
                .join('')}
              ${note.treatment.labs.other ? `<li>Otros: ${note.treatment.labs.other}</li>` : ''}
            </ul>

            <p><strong>Interconsultas:</strong></p>
            <ul>
              ${Object.entries(note.treatment.consults)
                .filter(([key, value]) => value && key !== 'other')
                .map(([key]) => `<li>${key}</li>`)
                .join('')}
              ${note.treatment.consults.other ? `<li>Otras: ${note.treatment.consults.other}</li>` : ''}
            </ul>

            ${note.treatment.diet && `
              <p><strong>Dieta:</strong> ${note.treatment.diet}</p>
            `}

            ${note.treatment.nursingInstructions && `
              <p><strong>Indicaciones de Enfermería:</strong> ${note.treatment.nursingInstructions}</p>
            `}
          </div>

          <div class="section">
            <div class="section-title">Pronóstico:</div>
            ${note.prognosis}
          </div>

          ${note.additionalComments && `
            <div class="section">
              <div class="section-title">Comentarios Adicionales:</div>
              ${note.additionalComments}
            </div>
          `}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSave = () => {
    toast({
      title: "Nota guardada",
      description: "La nota de evolución se ha guardado correctamente"
    })
  }

  return (
    <div className="space-y-6">
      <MedicalNoteHeader note={note} setNote={setNote} />
      <VitalSigns vitals={note.vitals} handleVitalsChange={handleVitalsChange} />
      <BackgroundSummary background={note.background} handleBackgroundChange={handleBackgroundChange} />
      <PhysicalExam exam={note.physicalExam} handleExamChange={handleExamChange} />
      <StudyResults results={note.studyResults} handleResultsChange={handleResultsChange} />
      <Diagnoses diagnoses={note.diagnoses || []} setDiagnoses={(diagnoses) => setNote(prev => ({ ...prev, diagnoses }))} />
      <Treatment
        treatment={note.treatment}
        handleTreatmentChange={handleTreatmentChange}
        addMedication={addMedication}
        removeMedication={removeMedication}
      />
      <FinalSection
        prognosis={note.prognosis}
        comments={note.additionalComments}
        handleChange={(field, value) => setNote(prev => ({ ...prev, [field]: value }))}
      />

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

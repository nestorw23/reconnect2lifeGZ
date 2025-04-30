
import React from "react"
import { motion } from "framer-motion"
import { ClipboardCheck, BarChart, Map, FileText } from "lucide-react"
import AssistTest from "@/components/AssistTest"
import SatisfactionTest from "@/components/SatisfactionTest"
import RecoveryCapitalTest from "@/components/RecoveryCapitalTest"
import FamilyInterview from "@/components/FamilyInterview"
import PreventionTest from "@/components/PreventionTest"

function Psychometrics() {
  const [selectedTest, setSelectedTest] = React.useState(null)

  const tests = [
    { id: "assist", name: "Evaluación de Consumo de Sustancias (ASSIST)" },
    { id: "satisfaction", name: "Escala de Satisfacción General" },
    { id: "recovery", name: "Test de Capital de Recuperación (CR)" },
    { id: "family", name: "Entrevista Familiar Estructurada" },
    { id: "prevention", name: "Prueba Prevención Familias (CBEFP-34)" },
    { id: "anxiety", name: "Evaluación de Ansiedad" },
    { id: "depression", name: "Detección de Depresión" },
  ]

  return (
    <div className="container p-4 space-y-6">
      <h1 className="text-2xl font-bold">Pruebas Psicométricas</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Sección Pruebas */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Pruebas Disponibles</h2>
          </div>
          <div className="mt-4 space-y-2">
            {tests.map((test) => (
              <button
                key={test.id}
                className={`w-full p-2 text-left rounded-md ${
                  selectedTest === test.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedTest(test.id)}
              >
                {test.name}
              </button>
            ))}
          </div>
        </div>

        {/* Área de la prueba seleccionada */}
        <div className="p-4 rounded-lg border bg-card">
          {selectedTest === "assist" ? (
            <AssistTest />
          ) : selectedTest === "satisfaction" ? (
            <SatisfactionTest />
          ) : selectedTest === "recovery" ? (
            <RecoveryCapitalTest />
          ) : selectedTest === "family" ? (
            <FamilyInterview />
          ) : selectedTest === "prevention" ? (
            <PreventionTest />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Selecciona una prueba para comenzar
              </p>
            </div>
          )}
        </div>

        {/* Sección Diagramas */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <BarChart className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Gráficos de Progreso</h2>
          </div>
          <div className="mt-4 h-40 flex items-center justify-center border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">Visualización de progreso próximamente</p>
          </div>
        </div>

        {/* Sección Camino de Recuperación */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Camino de Recuperación</h2>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span>Etapa 1: Reconocimiento</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <span>Etapa 2: Tratamiento</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <span>Etapa 3: Recuperación</span>
            </div>
          </div>
        </div>

        {/* Sección Notas de Evolución */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Notas de Evolución</h2>
          </div>
          <div className="mt-4">
            <textarea
              className="w-full h-32 p-2 rounded-md border resize-none"
              placeholder="Escribe tus notas de progreso aquí..."
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Psychometrics

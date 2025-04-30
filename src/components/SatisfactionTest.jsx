
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BarChart } from "lucide-react"

const lifeAreas = [
  { id: 1, name: "Consumo" },
  { id: 2, name: "Progreso en el trabajo o en la escuela" },
  { id: 3, name: "Manejo del dinero" },
  { id: 4, name: "Vida social /recreativa" },
  { id: 5, name: "Hábitos personales" },
  { id: 6, name: "Relaciones familiares o matrimoniales" },
  { id: 7, name: "Situación legal" },
  { id: 8, name: "Vida emocional" },
  { id: 9, name: "Comunicación" },
  { id: 10, name: "Satisfacción general" }
]

const interventionSuggestions = {
  "Consumo": [
    "Identificar patrones de consumo problemáticos",
    "Buscar alternativas saludables para manejar el estrés o las emociones",
    "Establecer límites claros y buscar apoyo si es necesario"
  ],
  "Progreso en el trabajo o en la escuela": [
    "Establecer metas realistas y alcanzables",
    "Desarrollar habilidades de organización y gestión del tiempo",
    "Buscar oportunidades de aprendizaje y crecimiento"
  ],
  "Manejo del dinero": [
    "Llevar un registro detallado de gastos e ingresos",
    "Crear un presupuesto realista y cumplirlo",
    "Buscar asesoramiento financiero si es necesario"
  ],
  "Vida social /recreativa": [
    "Identificar actividades placenteras y significativas",
    "Hacer un esfuerzo consciente por conectar con amigos y seres queridos",
    "Participar en actividades sociales y eventos comunitarios"
  ],
  "Hábitos personales": [
    "Priorizar el autocuidado y el bienestar físico (alimentación, ejercicio, sueño)",
    "Establecer rutinas saludables y cumplirlas",
    "Practicar técnicas de relajación y manejo del estrés"
  ],
  "Relaciones familiares o matrimoniales": [
    "Comunicar las necesidades y expectativas de manera clara y respetuosa",
    "Establecer límites saludables en las relaciones",
    "Buscar terapia familiar o de pareja si es necesario"
  ],
  "Situación legal": [
    "Buscar asesoramiento legal si es necesario",
    "Cooperar con las autoridades si es necesario",
    "Cumplir con las obligaciones legales"
  ],
  "Vida emocional": [
    "Identificar y expresar las emociones de manera saludable",
    "Practicar la autoafirmación y el diálogo interno positivo",
    "Buscar terapia para abordar problemas emocionales"
  ],
  "Comunicación": [
    "Practicar la escucha activa y la empatía",
    "Expresar las opiniones y sentimientos de manera clara y respetuosa",
    "Aprender a manejar los conflictos de manera constructiva"
  ],
  "Satisfacción general": [
    "Reflexionar sobre los valores y aspiraciones personales",
    "Celebrar los logros y aprender de los fracasos",
    "Practicar la gratitud y el optimismo"
  ]
}

function SatisfactionTest() {
  const { toast } = useToast()
  const [scores, setScores] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [evaluationHistory, setEvaluationHistory] = useState([])
  const username = JSON.parse(localStorage.getItem("user"))?.username || "Usuario"

  const handleScoreChange = (areaId, score) => {
    setScores(prev => ({
      ...prev,
      [areaId]: score
    }))
  }

  const calculateResults = () => {
    if (Object.keys(scores).length < lifeAreas.length) {
      toast({
        title: "Completa todas las áreas",
        description: "Por favor, califica todas las áreas antes de continuar",
        variant: "destructive"
      })
      return
    }

    const sortedAreas = lifeAreas
      .map(area => ({
        ...area,
        score: scores[area.id]
      }))
      .sort((a, b) => a.score - b.score)

    const lowestAreas = sortedAreas.slice(0, 3)
    
    const newEvaluation = {
      date: new Date().toISOString(),
      scores: { ...scores },
      suggestions: lowestAreas.map(area => ({
        area: area.name,
        score: area.score,
        suggestions: interventionSuggestions[area.name]
      }))
    }

    setEvaluationHistory(prev => {
      const updated = [...prev, newEvaluation]
      if (updated.length > 3) updated.shift() // Mantener solo las últimas 3 evaluaciones
      return updated
    })

    setShowResults(true)
  }

  const renderBarChart = (evaluationData) => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Nivel de Satisfacción por Área de Vida de {username}
        </h3>
        <div className="space-y-2">
          {lifeAreas.map(area => (
            <div key={area.id} className="flex items-center space-x-2">
              <span className="w-40 text-sm">{area.name}</span>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(evaluationData.scores[area.id] / 10) * 100}%` }}
                  className={`h-full ${
                    evaluationData.scores[area.id] <= 3
                      ? "bg-red-500"
                      : evaluationData.scores[area.id] <= 7
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
              </div>
              <span className="w-8 text-right">{evaluationData.scores[area.id]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          1 = Mayor insatisfacción, 10 = Mayor satisfacción
        </p>
      </div>
    )
  }

  if (showResults) {
    const latestEvaluation = evaluationHistory[evaluationHistory.length - 1]

    return (
      <div className="space-y-8">
        {renderBarChart(latestEvaluation)}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Áreas que requieren atención:</h3>
          {latestEvaluation.suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">{suggestion.area} (Puntuación: {suggestion.score})</h4>
              <ul className="list-disc list-inside space-y-1">
                {suggestion.suggestions.map((sug, i) => (
                  <li key={i} className="text-sm">{sug}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {evaluationHistory.length < 3 && (
          <Button
            onClick={() => {
              setScores({})
              setShowResults(false)
            }}
            className="w-full"
          >
            Realizar Nueva Evaluación ({3 - evaluationHistory.length} restantes)
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg space-y-4">
        <p>
          Este instrumento tiene como objetivo conocer tu nivel de satisfacción con respecto a cada una de las áreas de tu vida.
          Por favor, da click en la casilla que corresponda al nivel de satisfacción que tienes con cada área.
        </p>
        <p>
          Los números más cercanos a uno reflejan varios grados de insatisfacción, siendo el uno el nivel de mayor insatisfacción;
          mientras que los números más cercanos a diez reflejan los niveles más altos de satisfacción.
        </p>
        <p>
          Establece con base en la escala numérica (1-10) exactamente cómo te sientes hoy con respecto a esa área.
          Evita pensar en lo satisfecho que te sentías ayer, concéntrate solamente en la satisfacción que sientes hoy en cada área de tu vida.
        </p>
      </div>

      <div className="space-y-4">
        {lifeAreas.map(area => (
          <div key={area.id} className="space-y-2">
            <label className="font-medium">{area.name}</label>
            <div className="flex space-x-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleScoreChange(area.id, i + 1)}
                  className={`w-8 h-8 rounded ${
                    scores[area.id] === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted-foreground/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={calculateResults} className="w-full">
        Ver Resultados
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Azrin, N. H., Naster, B. J., & Jones, R. (1973). Reciprocity counseling: A rapid learning-based procedure for marital counseling. 
        Behaviour Research and Therapy, 11(4), 365–382. doi:10.1016/0005-7967(73)90095-8
      </p>
    </div>
  )
}

export default SatisfactionTest

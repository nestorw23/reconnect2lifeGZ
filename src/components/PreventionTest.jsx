
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const questions = [
  // Subescala 1: Actitudes Familiares hacia el Consumo
  { id: "1.1", text: "En nuestra familia, se considera aceptable que los adultos consuman marihuana recreativamente.", subescale: 1 },
  { id: "1.2", text: "En nuestra familia, se considera seguro que los adultos consuman alcohol diariamente.", subescale: 1 },
  { id: "1.3", text: "En nuestra familia, se considera aceptable que los adultos usen medicamentos recetados sin prescripción médica.", subescale: 1 },
  
  // Subescala 2: Historial Familiar
  { id: "2.1", text: "En nuestra familia (padres, abuelos, tíos), ha habido personas con problemas por consumo de alcohol o drogas.", subescale: 2 },
  
  // Subescala 3: Salud Mental Parental
  { id: "3.1", text: "Como padre/madre/cuidador(a), me siento triste o desesperanzado/a.", subescale: 3 },
  { id: "3.2", text: "Como padre/madre/cuidador(a), he perdido interés en actividades diarias que solía disfrutar.", subescale: 3 },
  { id: "3.3", text: "Como padre/madre/cuidador(a), me siento fatigado/a o sin energía la mayor parte del tiempo.", subescale: 3 },
  
  // Subescala 4: Consumo de Sustancias en Hijos/as
  { id: "4.1", text: "Mi hijo(a) ha consumido alcohol en los últimos 30 días.", subescale: 4 },
  { id: "4.2", text: "Mi hijo(a) ha usado marihuana en los últimos 30 días.", subescale: 4 },
  { id: "4.3", text: "Mi hijo(a) ha consumido otras drogas ilegales en los últimos 30 días.", subescale: 4 },
  
  // Subescala 5: Influencia del Grupo de Pares
  { id: "5.1", text: "La mayoría de los amigos de mi hijo(a) consumen alcohol regularmente.", subescale: 5 },
  { id: "5.2", text: "Es común que los amigos de mi hijo(a) le ofrezcan alcohol u otras sustancias en eventos sociales.", subescale: 5 },
  { id: "5.3", text: "Los amigos de mi hijo(a) suelen consumir drogas recreativas.", subescale: 5 },
  
  // Subescala 6: Conducta Disruptiva
  { id: "6.1", text: "Mi hijo(a) desafía la autoridad de los adultos (padres, maestros).", subescale: 6 },
  { id: "6.2", text: "Mi hijo(a) se involucra en peleas físicas o discusiones agresivas.", subescale: 6 },
  { id: "6.3", text: "Mi hijo(a) no completa las tareas asignadas (escolares, del hogar) sin supervisión constante.", subescale: 6 },
  
  // Subescala 7: Calidad Afectiva Padres-Hijos
  { id: "7.1", text: "En nuestra familia, nos cuesta expresar verbalmente cuánto nos apreciamos o queremos.", subescale: 7 },
  { id: "7.2", text: "Me resulta difícil entender bien los sentimientos o preocupaciones de mi hijo(a).", subescale: 7 },
  { id: "7.3", text: "Cuando mi hijo/a habla, me cuesta escucharle activamente sin interrumpir.", subescale: 7 },
  
  // Subescala 8: Manejo y Supervisión Parental
  { id: "8.1", text: "En casa, las reglas sobre lo que se puede o no hacer no están claras.", subescale: 8 },
  { id: "8.2", text: "Superviso poco las actividades diarias de mi hijo(a) (tareas, tiempo libre).", subescale: 8 },
  { id: "8.3", text: "No soy consistente al aplicar las consecuencias cuando no se cumplen las reglas.", subescale: 8 },
  
  // Subescala 9: Monitoreo Parental
  { id: "9.1", text: "No sé dónde está mi hijo(a) cuando sale de casa.", subescale: 9 },
  { id: "9.2", text: "No conozco las actividades que realiza mi hijo(a) fuera del hogar.", subescale: 9 },
  { id: "9.3", text: "No estoy al tanto de con quién pasa el tiempo mi hijo(a).", subescale: 9 },
  
  // Subescala 10: Estilo de Disciplina Parental
  { id: "10.1", text: "Utilizo castigos físicos para disciplinar a mi hijo(a).", subescale: 10 },
  { id: "10.2", text: "No explico las razones detrás de las reglas o consecuencias a mi hijo(a).", subescale: 10 },
  { id: "10.3", text: "Pierdo la calma o grito al disciplinar a mi hijo(a).", subescale: 10 },
  
  // Subescala 11: Conflicto Familiar
  { id: "11.1", text: "En mi familia, ocurren discusiones acaloradas o gritos.", subescale: 11 },
  { id: "11.2", text: "Los conflictos familiares crean un ambiente tenso en el hogar.", subescale: 11 },
  { id: "11.3", text: "Nos cuesta resolver los desacuerdos en la familia de forma tranquila.", subescale: 11 },
  
  // Subescala 12: Cohesión Familiar
  { id: "12.1", text: "Pasamos poco tiempo juntos como familia realizando actividades agradables.", subescale: 12 },
  { id: "12.2", text: "En casa, no nos sentimos cómodos compartiendo pensamientos y sentimientos personales.", subescale: 12 },
  { id: "12.3", text: "No mantenemos tradiciones familiares (celebraciones, rutinas especiales).", subescale: 12 }
]

const recommendations = {
  1: {
    title: "Actitudes Familiares hacia el Consumo",
    risk: "La familia muestra creencias y normas que tienden a aceptar o minimizar los riesgos del consumo de sustancias.",
    suggestions: [
      "Abrir un diálogo familiar sobre las actitudes hacia el consumo y sus riesgos reales",
      "Establecer normas claras y consistentes sobre el consumo",
      "Promover alternativas de ocio no centradas en sustancias"
    ]
  },
  2: {
    title: "Historial Familiar",
    risk: "Existen antecedentes familiares de abuso o dependencia de alcohol o drogas.",
    suggestions: [
      "Tomar conciencia de este posible mayor riesgo",
      "Reforzar activamente los factores de protección",
      "Considerar buscar orientación preventiva específica"
    ]
  },
  3: {
    title: "Salud Mental Parental",
    risk: "Presencia significativa de síntomas asociados a la depresión en el/los padre/s o cuidador/es.",
    suggestions: [
      "Buscar evaluación y apoyo profesional para la salud mental",
      "Desarrollar estrategias de afrontamiento del estrés",
      "Fortalecer las redes de apoyo social"
    ]
  },
  4: {
    title: "Consumo de Sustancias en Hijos/as",
    risk: "Indica un consumo reciente de sustancias por parte del hijo/a adolescente.",
    suggestions: [
      "Iniciar conversaciones abiertas y sin juicios",
      "Buscar evaluación y orientación profesional",
      "Enseñar habilidades para rechazar el consumo"
    ]
  },
  5: {
    title: "Influencia del Grupo de Pares",
    risk: "El grupo de amigos cercanos parece tener una influencia significativa hacia el consumo.",
    suggestions: [
      "Dialogar sobre cómo elegir amistades",
      "Fomentar participación en actividades saludables",
      "Practicar formas asertivas de decir 'no'"
    ]
  },
  6: {
    title: "Conducta Disruptiva",
    risk: "El hijo/a muestra comportamientos desafiantes o agresivos frecuentes.",
    suggestions: [
      "Considerar una evaluación profesional",
      "Implementar pautas de manejo conductual claras",
      "Enseñar habilidades de autocontrol emocional"
    ]
  },
  7: {
    title: "Calidad Afectiva Padres-Hijos",
    risk: "Dificultades en la expresión de afecto y comprensión emocional mutua.",
    suggestions: [
      "Dedicar tiempo de calidad a la interacción",
      "Practicar la escucha activa",
      "Expresar cariño y apoyo explícitamente"
    ]
  },
  8: {
    title: "Manejo y Supervisión Parental",
    risk: "Dificultades en el establecimiento y mantenimiento de reglas claras.",
    suggestions: [
      "Definir y comunicar claramente las normas familiares",
      "Supervisar las actividades del hijo/a",
      "Ser consistentes en la disciplina"
    ]
  },
  9: {
    title: "Monitoreo Parental",
    risk: "Bajo conocimiento sobre las actividades del hijo/a fuera del hogar.",
    suggestions: [
      "Incrementar el conocimiento sobre la vida del hijo/a",
      "Mantener comunicación abierta sobre actividades",
      "Conocer a los amigos y sus familias"
    ]
  },
  10: {
    title: "Estilo de Disciplina",
    risk: "Estilo de disciplina inconsistente o muy severo.",
    suggestions: [
      "Aplicar disciplina de forma calmada y consistente",
      "Evitar el castigo físico",
      "Explicar las razones de las consecuencias"
    ]
  },
  11: {
    title: "Conflicto Familiar",
    risk: "Presencia frecuente de discusiones y tensión en el hogar.",
    suggestions: [
      "Aprender habilidades de comunicación asertiva",
      "Establecer reglas para discutir",
      "Considerar mediación o terapia familiar"
    ]
  },
  12: {
    title: "Cohesión Familiar",
    risk: "Bajo nivel de unión emocional y tiempo compartido.",
    suggestions: [
      "Fomentar actividades compartidas",
      "Crear y mantener tradiciones familiares",
      "Promover espacios de expresión emocional"
    ]
  }
}

function PreventionTest() {
  const { toast } = useToast()
  const [currentBlock, setCurrentBlock] = useState(0)
  const [answers, setAnswers] = useState({})
  const [evaluationHistory, setEvaluationHistory] = useState([])
  const [showResults, setShowResults] = useState(false)
  const username = JSON.parse(localStorage.getItem("user"))?.username || "Usuario"

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const calculateScores = () => {
    const scores = {}
    for (let i = 1; i <= 12; i++) {
      scores[i] = 0
      const subescaleQuestions = questions.filter(q => q.subescale === i)
      subescaleQuestions.forEach(q => {
        if (answers[q.id]) {
          scores[i] += answers[q.id]
        }
      })
    }
    return scores
  }

  const getHighRiskAreas = (scores) => {
    const highRiskAreas = []
    Object.entries(scores).forEach(([subescale, score]) => {
      const threshold = subescale === "2" ? 3 : 9 // Subescala 2 tiene solo 1 pregunta
      if (score > threshold) {
        highRiskAreas.push(parseInt(subescale))
      }
    })
    return highRiskAreas
  }

  const handleNext = () => {
    const currentQuestions = questions.slice(currentBlock * 12, (currentBlock + 1) * 12)
    const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined)

    if (!allAnswered) {
      toast({
        title: "Responde todas las preguntas",
        description: "Por favor, responde todas las preguntas antes de continuar",
        variant: "destructive"
      })
      return
    }

    if (currentBlock === 2) {
      const scores = calculateScores()
      const highRiskAreas = getHighRiskAreas(scores)
      
      const newEvaluation = {
        date: new Date().toISOString(),
        scores,
        highRiskAreas,
        recommendations: highRiskAreas.map(area => ({
          ...recommendations[area],
          score: scores[area]
        }))
      }

      setEvaluationHistory(prev => {
        const updated = [...prev, newEvaluation]
        if (updated.length > 6) updated.shift()
        return updated
      })
      
      setShowResults(true)
    } else {
      setCurrentBlock(prev => prev + 1)
    }
  }

  const renderRadarChart = (evaluation) => {
    const data = {
      labels: Object.keys(recommendations).map(k => recommendations[k].title),
      datasets: [{
        label: "Factores de Riesgo Familiar",
        data: Object.values(evaluation.scores),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    }

    const options = {
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 15
        }
      }
    }

    return <Radar data={data} options={options} />
  }

  if (showResults) {
    const latestEvaluation = evaluationHistory[evaluationHistory.length - 1]

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">
          Resultados de tu Evaluación de Prevención Familiar
        </h2>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Visualización de Factores de Riesgo</h3>
          {renderRadarChart(latestEvaluation)}
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Áreas que Requieren Atención</h3>
          {latestEvaluation.recommendations.map((rec, index) => (
            <div key={index} className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-lg mb-2">{rec.title}</h4>
              <p className="text-muted-foreground mb-4">{rec.risk}</p>
              <h5 className="font-medium mb-2">Sugerencias:</h5>
              <ul className="list-disc list-inside space-y-2">
                {rec.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-muted-foreground">{suggestion}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Importante:</strong> Estos resultados son orientativos y no constituyen un diagnóstico. 
            Identifican áreas que podrían beneficiarse de atención. Habla con tu terapeuta para una interpretación 
            completa en tu contexto.
          </p>
        </div>

        {evaluationHistory.length < 6 && (
          <Button
            onClick={() => {
              setAnswers({})
              setCurrentBlock(0)
              setShowResults(false)
            }}
            className="w-full"
          >
            Realizar Nueva Evaluación ({6 - evaluationHistory.length} restantes)
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {currentBlock === 0 && (
        <div className="bg-muted p-4 rounded-lg">
          <p className="mb-4">
            Hola, {username}. A continuación, evaluaremos factores de riesgo psicosociales en el entorno familiar 
            que podrían estar asociados con conductas adictivas.
          </p>
          <p>
            Te presentaré 34 frases que describen situaciones o comportamientos familiares. Por favor, indica 
            con qué frecuencia ocurre cada situación en tu familia.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {questions
          .slice(currentBlock * 12, (currentBlock + 1) * 12)
          .map(question => (
            <div key={question.id} className="space-y-2">
              <p className="font-medium">{question.text}</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(question.id, value)}
                    className={`p-2 rounded ${
                      answers[question.id] === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Totalmente en desacuerdo</span>
                <span>Totalmente de acuerdo</span>
              </div>
            </div>
          ))}
      </div>

      <Button onClick={handleNext} className="w-full">
        {currentBlock === 2 ? "Ver Resultados" : "Siguiente"}
      </Button>
    </div>
  )
}

export default PreventionTest

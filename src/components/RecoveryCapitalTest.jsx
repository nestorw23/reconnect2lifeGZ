
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
  // Capital Material (1.1-1.6)
  { id: "1.1", text: "Tengo acceso a recursos financieros suficientes para cubrir mis necesidades básicas" },
  { id: "1.2", text: "Tengo una vivienda estable y segura" },
  { id: "1.3", text: "Tengo acceso a transporte confiable" },
  { id: "1.4", text: "Tengo acceso a servicios de salud cuando los necesito" },
  { id: "1.5", text: "Puedo permitirme actividades recreativas saludables" },
  { id: "1.6", text: "Tengo los recursos materiales necesarios para mantener mi recuperación" },
  
  // Capital Mental/Cultural (2.1-2.6)
  { id: "2.1", text: "Tengo educación o habilidades que me ayudan en mi vida diaria" },
  { id: "2.2", text: "Comprendo bien mi proceso de recuperación" },
  { id: "2.3", text: "Puedo tomar decisiones informadas sobre mi tratamiento" },
  { id: "2.4", text: "Tengo intereses y hobbies que me mantienen ocupado" },
  { id: "2.5", text: "Sé identificar situaciones de riesgo" },
  { id: "2.6", text: "Tengo estrategias efectivas para manejar el estrés" },
  
  // Capital Emocional (3.1-3.6)
  { id: "3.1", text: "Puedo manejar mis emociones de manera saludable" },
  { id: "3.2", text: "Me siento esperanzado sobre mi futuro" },
  { id: "3.3", text: "Tengo una buena autoestima" },
  { id: "3.4", text: "Puedo expresar mis sentimientos de manera apropiada" },
  { id: "3.5", text: "Me recupero bien de los contratiempos" },
  { id: "3.6", text: "Siento paz interior la mayor parte del tiempo" },
  
  // Capital Espiritual (4.1-4.6)
  { id: "4.1", text: "Tengo un sentido de propósito en mi vida" },
  { id: "4.2", text: "Tengo creencias que me dan fuerza" },
  { id: "4.3", text: "Practico la gratitud regularmente" },
  { id: "4.4", text: "Siento conexión con algo más grande que yo mismo" },
  { id: "4.5", text: "Encuentro significado en mis experiencias" },
  { id: "4.6", text: "Tengo esperanza en mi proceso de recuperación" },
  
  // Capital Social (5.1-5.6)
  { id: "5.1", text: "Tengo amigos que apoyan mi recuperación" },
  { id: "5.2", text: "Mi familia entiende y apoya mi proceso" },
  { id: "5.3", text: "Participo en grupos o comunidades de apoyo" },
  { id: "5.4", text: "Tengo relaciones saludables" },
  { id: "5.5", text: "Puedo pedir ayuda cuando la necesito" },
  { id: "5.6", text: "Tengo personas que confían en mí" }
]

function RecoveryCapitalTest() {
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
    const scores = {
      material: 0,
      mental: 0,
      emotional: 0,
      spiritual: 0,
      social: 0
    }

    Object.entries(answers).forEach(([id, value]) => {
      const category = id.split(".")[0]
      switch (category) {
        case "1": scores.material += value; break
        case "2": scores.mental += value; break
        case "3": scores.emotional += value; break
        case "4": scores.spiritual += value; break
        case "5": scores.social += value; break
      }
    })

    return scores
  }

  const getInterpretation = (score) => {
    if (score < 18) return "Bajo (Área de Oportunidad)"
    if (score === 18) return "Normal"
    return "Alto (Fortaleza)"
  }

  const getFeedback = (category, score) => {
    const interpretation = getInterpretation(score)
    const feedbacks = {
      material: {
        low: "Un capital material bajo sugiere que puedes estar enfrentando dificultades con vivienda, finanzas o acceso a servicios. Esto puede generar estrés adicional y dificultar tu enfoque en la recuperación. Considera explorar recursos comunitarios, crear un presupuesto básico y hablar con tu red de apoyo sobre opciones para mejorar tu situación material.",
        normal: "Mantienes un nivel adecuado de recursos materiales. Continúa administrando tus recursos de manera responsable y considera crear un fondo de emergencia si aún no lo tienes.",
        high: "Tu estabilidad material es una fortaleza significativa. Aprovecha esta base sólida para invertir en tu bienestar general y considera cómo puedes usar estos recursos para fortalecer otras áreas de tu recuperación."
      },
      mental: {
        low: "Tu capital mental actual sugiere que podrías beneficiarte de más herramientas y conocimientos. Considera participar en talleres educativos, buscar mentoría o explorar nuevas formas de aprendizaje que apoyen tu recuperación.",
        normal: "Tienes una base mental sólida. Continúa expandiendo tu comprensión y habilidades a través del aprendizaje continuo y la práctica regular.",
        high: "Tu capital mental es una fortaleza notable. Considera compartir tu conocimiento con otros y usar tus habilidades para fortalecer otras áreas de tu recuperación."
      },
      emotional: {
        low: "Tu capital emocional actual indica que podrías beneficiarte de desarrollar más herramientas para el manejo emocional. Considera la terapia, prácticas de mindfulness o grupos de apoyo emocional.",
        normal: "Mantienes un equilibrio emocional saludable. Continúa practicando la autorregulación y busca nuevas formas de fortalecer tu resiliencia emocional.",
        high: "Tu inteligencia emocional es una fortaleza significativa. Usa esta capacidad para profundizar tus relaciones y apoyar a otros en su journey emocional."
      },
      spiritual: {
        low: "Tu capital espiritual actual sugiere que podrías beneficiarte de explorar prácticas que te conecten con un sentido más profundo de propósito. Considera la meditación, la reflexión personal o la conexión con comunidades espirituales.",
        normal: "Mantienes una conexión espiritual saludable. Continúa nutriendo tu práctica espiritual y explorando nuevas formas de profundizar tu conexión.",
        high: "Tu fortaleza espiritual es un recurso valioso. Considera cómo puedes usar esta conexión para inspirar y apoyar a otros en su journey."
      },
      social: {
        low: "Tu capital social actual indica que podrías beneficiarte de expandir y fortalecer tu red de apoyo. Considera unirte a grupos de recuperación, participar en actividades comunitarias o reconectar con relaciones saludables.",
        normal: "Mantienes conexiones sociales saludables. Continúa nutriendo estas relaciones y considera formas de profundizar estos vínculos.",
        high: "Tu red social es una fortaleza significativa. Aprovecha estas conexiones para mantener tu recuperación y considera cómo puedes ser un apoyo para otros."
      }
    }

    return feedbacks[category][interpretation.toLowerCase().startsWith("bajo") ? "low" : interpretation.toLowerCase().startsWith("normal") ? "normal" : "high"]
  }

  const handleNext = () => {
    const currentQuestions = questions.slice(currentBlock * 10, (currentBlock + 1) * 10)
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
      const newEvaluation = {
        date: new Date().toISOString(),
        scores,
        interpretations: {
          material: getInterpretation(scores.material),
          mental: getInterpretation(scores.mental),
          emotional: getInterpretation(scores.emotional),
          spiritual: getInterpretation(scores.spiritual),
          social: getInterpretation(scores.social)
        },
        feedback: {
          material: getFeedback("material", scores.material),
          mental: getFeedback("mental", scores.mental),
          emotional: getFeedback("emotional", scores.emotional),
          spiritual: getFeedback("spiritual", scores.spiritual),
          social: getFeedback("social", scores.social)
        }
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
      labels: ["Material", "Mental", "Emocional", "Espiritual", "Social"],
      datasets: [{
        label: "Capital de Recuperación",
        data: [
          evaluation.scores.material,
          evaluation.scores.mental,
          evaluation.scores.emotional,
          evaluation.scores.spiritual,
          evaluation.scores.social
        ],
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
          suggestedMin: 6,
          suggestedMax: 30
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
          Resultados de tu Evaluación de Capital de Recuperación
        </h2>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Paso 1: Puntuaciones por Área</h3>
          {Object.entries(latestEvaluation.scores).map(([category, score]) => (
            <div key={category} className="mb-2">
              <p className="capitalize">
                Capital {category}: {score}/30
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Paso 2: Interpretación de tus Puntuaciones</h3>
          {Object.entries(latestEvaluation.interpretations).map(([category, interpretation]) => (
            <div key={category} className="mb-2">
              <p className="capitalize">
                Capital {category}: {interpretation}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Visualización de tus resultados</h3>
          {renderRadarChart(latestEvaluation)}
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Paso 3: Análisis Detallado y Sugerencias</h3>
          {Object.entries(latestEvaluation.feedback).map(([category, feedback]) => (
            <div key={category} className="mb-6">
              <h4 className="font-medium capitalize mb-2">Análisis de tu Capital {category}:</h4>
              <p className="text-muted-foreground">{feedback}</p>
            </div>
          ))}
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
            Hola, {username}. A continuación, evaluaremos tu 'Capital de Recuperación'. Este concepto se refiere a todos los recursos (financieros, de conocimiento, emocionales, espirituales y de relaciones) que has acumulado y que pueden ayudarte a mantener tu recuperación y bienestar.
          </p>
          <p>
            La prueba consiste en 30 afirmaciones sobre diferentes aspectos de tu vida. Para cada una, te pediré que indiques tu grado de acuerdo usando una escala de 5 puntos.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {questions
          .slice(currentBlock * 10, (currentBlock + 1) * 10)
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

export default RecoveryCapitalTest


import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const substances = [
  { id: "a", name: "Tabaco (cigarrillos, cigarros habanos, tabaco de mascar, pipa, etc.)" },
  { id: "b", name: "Bebidas alcohólicas (cerveza, vino, licores destilados, etc.)" },
  { id: "c", name: "Cannabis (marihuana, hierba, hashish, etc.)" },
  { id: "d", name: "Cocaína (coca, basuco, crack, paco, etc.)" },
  { id: "e", name: "Anfetaminas u otro tipo de estimulantes (speed, éxtasis, píldoras adelgazantes, etc.)" },
  { id: "f", name: "Inhalantes (pegantes, colas, gasolina, solventes, etc.)" },
  { id: "g", name: "Tranquilizantes o pastillas para dormir (Valium/Diazepam, Trankimazin/Alprazolam/Xanax, Orfidal/Lorazepam, Rohipnol, etc.)" },
  { id: "h", name: "Alucinógenos (LSD, ácidos, hongos, mezcalina, ketamina, PCP, etc.)" },
  { id: "i", name: "Opiáceos (heroína, metadona, codeína, morfina, dolantina/petidina, etc.)" },
  { id: "j", name: "Otras" }
]

const questions = [
  "",
  "¿Alguna vez has consumido alguna de estas sustancias? (sin que hayan sido recetadas por un doctor)",
  "En los últimos tres meses, ¿con qué frecuencia ha consumido las sustancias que mencionó?",
  "En los últimos tres meses, ¿con qué frecuencia ha tenido deseos fuertes o ansias de consumir?",
  "En los últimos tres meses, ¿con qué frecuencia le ha llevado su consumo a problemas de salud, sociales, legales o económicos?",
  "En los últimos tres meses, ¿con qué frecuencia dejó de hacer lo que se esperaba de usted habitualmente por el consumo?",
  "¿Un amigo, un familiar o alguien más alguna vez ha mostrado preocupación por su consumo?",
  "¿Ha intentado alguna vez controlar, reducir o dejar de consumir y no lo ha logrado?",
  "¿Ha consumido alguna vez alguna droga por vía inyectada? (ÚNICAMENTE PARA USOS NO MÉDICOS)"
]

function AssistTest() {
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState({})
  const [selectedSubstances, setSelectedSubstances] = useState({})
  const [otherSubstance, setOtherSubstance] = useState("")
  const [scores, setScores] = useState({})
  const [showResults, setShowResults] = useState(false)

  const frequencyOptions = [
    { value: 0, label: "Nunca" },
    { value: 2, label: "1-2 veces" },
    { value: 3, label: "Mensualmente" },
    { value: 4, label: "Semanalmente" },
    { value: 6, label: "Diariamente o casi a diario" }
  ]

  const threeMonthOptions = [
    { value: 0, label: "No, nunca" },
    { value: 6, label: "Si, en los últimos tres meses" },
    { value: 3, label: "Si, pero no en los últimos tres meses" }
  ]

  const getQuestionScore = (questionNumber) => {
    switch (questionNumber) {
      case 2: return frequencyOptions
      case 3: return [
        { value: 0, label: "Nunca" },
        { value: 3, label: "1-2 veces" },
        { value: 4, label: "Mensualmente" },
        { value: 5, label: "Semanalmente" },
        { value: 6, label: "Diariamente o casi a diario" }
      ]
      case 4: return [
        { value: 0, label: "Nunca" },
        { value: 4, label: "1-2 veces" },
        { value: 5, label: "Mensualmente" },
        { value: 6, label: "Semanalmente" },
        { value: 7, label: "Diariamente o casi a diario" }
      ]
      case 5: return [
        { value: 0, label: "Nunca" },
        { value: 5, label: "1-2 veces" },
        { value: 6, label: "Mensualmente" },
        { value: 7, label: "Semanalmente" },
        { value: 8, label: "Diariamente o casi a diario" }
      ]
      case 6:
      case 7: return threeMonthOptions
      default: return frequencyOptions
    }
  }

  const calculateScores = () => {
    const newScores = {}
    
    Object.keys(selectedSubstances).forEach(substance => {
      if (selectedSubstances[substance]) {
        let score = 3 // Base score for "Yes" in question 1
        
        // Add scores from questions 2-7
        for (let q = 2; q <= 7; q++) {
          if (answers[q] && answers[q][substance]) {
            score += answers[q][substance]
          }
        }
        
        newScores[substance] = score
      }
    })
    
    setScores(newScores)
    return newScores
  }

  const getInterventionLevel = (substance, score) => {
    const isAlcohol = substance === "b"
    const thresholds = isAlcohol 
      ? { low: 10, high: 27 }
      : { low: 3, high: 27 }

    if (score === 0) return "Sin riesgo"
    if (score > 0 && score <= thresholds.low) return "Sin Intervención"
    if (score > thresholds.low && score < thresholds.high) return "Intervención Breve"
    return "Tratamiento Intensivo"
  }

  const handleNext = () => {
    // Validación para la primera pregunta
    if (currentQuestion === 1 && !Object.values(selectedSubstances).some(v => v)) {
      toast({
        title: "Selecciona al menos una sustancia",
        description: "Debes seleccionar al menos una sustancia para continuar",
        variant: "destructive"
      })
      return
    }

    // Validación para las preguntas 2-7
    if (currentQuestion >= 2 && currentQuestion <= 7) {
      const selectedSubstanceIds = Object.entries(selectedSubstances)
        .filter(([_, selected]) => selected)
        .map(([id]) => id)

      const allAnswered = selectedSubstanceIds.every(id => 
        answers[currentQuestion]?.[id] !== undefined
      )

      if (!allAnswered) {
        toast({
          title: "Responde todas las opciones",
          description: "Debes responder para todas las sustancias seleccionadas",
          variant: "destructive"
        })
        return
      }
    }

    // Validación para la última pregunta
    if (currentQuestion === 8 && answers[8] === undefined) {
      toast({
        title: "Selecciona una opción",
        description: "Debes responder la pregunta para continuar",
        variant: "destructive"
      })
      return
    }

    if (currentQuestion === 8) {
      calculateScores()
      setShowResults(true)
      return
    }

    setCurrentQuestion(prev => prev + 1)
  }

  const renderFrequencyQuestion = (questionNumber) => {
    const options = getQuestionScore(questionNumber)
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {questions[questionNumber]}
        </h3>
        {Object.entries(selectedSubstances).map(([id, selected]) => {
          if (!selected) return null
          return (
            <div key={id} className="space-y-2">
              <p className="font-medium">{substances.find(s => s.id === id).name}</p>
              <div className="flex flex-wrap gap-2">
                {options.map(option => (
                  <button
                    key={option.value}
                    className={`p-2 rounded ${
                      answers[questionNumber]?.[id] === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    onClick={() => {
                      setAnswers(prev => ({
                        ...prev,
                        [questionNumber]: { 
                          ...prev[questionNumber], 
                          [id]: option.value 
                        }
                      }))
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{questions[1]}</h3>
            <div className="space-y-2">
              {substances.map(substance => (
                <div key={substance.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={substance.id}
                    checked={selectedSubstances[substance.id] || false}
                    onChange={(e) => {
                      setSelectedSubstances(prev => ({
                        ...prev,
                        [substance.id]: e.target.checked
                      }))
                    }}
                    className="rounded"
                  />
                  <label htmlFor={substance.id}>{substance.name}</label>
                </div>
              ))}
            </div>
            {selectedSubstances.j && (
              <input
                type="text"
                value={otherSubstance}
                onChange={(e) => setOtherSubstance(e.target.value)}
                placeholder="Especifique"
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        )

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return renderFrequencyQuestion(currentQuestion)

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{questions[8]}</h3>
            <div className="flex flex-wrap gap-2">
              {threeMonthOptions.map(option => (
                <button
                  key={option.value}
                  className={`p-2 rounded ${
                    answers[8] === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, 8: option.value }))
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Resultados del Test ASSIST</h3>
        {Object.entries(scores).map(([substance, score]) => {
          const interventionLevel = getInterventionLevel(substance, score)
          const substanceName = substances.find(s => s.id === substance).name
          
          return (
            <div key={substance} className="p-4 bg-card rounded-lg">
              <h4 className="font-medium">{substanceName}</h4>
              <p className="mt-2">Puntuación: {score}</p>
              <p className={`mt-1 ${
                interventionLevel === "Tratamiento Intensivo" 
                  ? "text-red-500" 
                  : interventionLevel === "Intervención Breve" 
                    ? "text-yellow-500" 
                    : "text-green-500"
              }`}>
                Nivel de riesgo: {interventionLevel}
              </p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <p>
          Esta prueba te ayudará a identificar posibles áreas de preocupación relacionadas con tu consumo de sustancias. 
          Recuerda que no sustituye una evaluación profesional.
        </p>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {renderQuestion()}
      </motion.div>

      <Button onClick={handleNext} className="w-full">
        {currentQuestion === 8 ? "Ver Resultados" : "Siguiente"}
      </Button>
    </div>
  )
}

export default AssistTest

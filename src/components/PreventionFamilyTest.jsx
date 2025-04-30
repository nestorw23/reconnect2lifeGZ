
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function PreventionFamilyTest() {
  const { toast } = useToast()
  const [currentBlock, setCurrentBlock] = useState(0)
  const [answers, setAnswers] = useState({})
  const [evaluationHistory, setEvaluationHistory] = useState([])
  const [showResults, setShowResults] = useState(false)
  const username = JSON.parse(localStorage.getItem("user"))?.username || "Usuario"

  // Resto del código del componente...

  const handleNext = () => {
    const startIndex = currentBlock * 20
    const endIndex = startIndex + (currentBlock === 6 ? 12 : 20)
    const currentItems = ItemsPPF.slice(startIndex, endIndex)
    
    const allAnswered = currentItems.every(item => answers[item.itemNumber] !== undefined)

    if (!allAnswered) {
      toast({
        title: "Responde todas las preguntas",
        description: "Por favor, responde todas las preguntas antes de continuar",
        variant: "destructive"
      })
      return
    }

    if (currentBlock === 6) {
      // Lógica para mostrar resultados...
      setShowResults(true)
    } else {
      setCurrentBlock(prev => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Resto del JSX... */}
      <div className="space-y-6">
        {ItemsPPF
          .slice(currentBlock * 20, currentBlock * 20 + (currentBlock === 6 ? 12 : 20))
          .map(item => (
            <div key={item.itemNumber} className="space-y-2">
              <p className="font-medium">{item.itemText}</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(item.itemNumber, value)}
                    className={`p-2 rounded ${
                      answers[item.itemNumber] === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>

      <Button onClick={handleNext} className="w-full">
        {currentBlock === 6 ? "Ver Resultados" : "Siguiente"}
      </Button>
    </div>
  )
}

export default PreventionFamilyTest

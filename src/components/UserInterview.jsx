
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

function UserInterview() {
  const { toast } = useToast()
  const [currentSection, setCurrentSection] = useState("intro")
  const [preScreening, setPreScreening] = useState({
    mainSubstance: "",
    isOver15: null
  })
  const [identification, setIdentification] = useState({
    phone: "",
    age: "",
    sex: "",
    education: "",
    yearsOfStudy: "",
    maritalStatus: "",
    livingWith: [],
    employment: {
      type: "",
      years: "",
      timeType: "",
      monthlyIncome: "",
      mostFrequentJob: ""
    }
  })
  const [motivation, setMotivation] = useState("")
  const [substanceUse, setSubstanceUse] = useState({
    mainSubstance: "",
    yearsOfUse: {
      alcohol: "",
      tobacco: "",
      mainSubstance: ""
    },
    useMethod: "",
    frequency: "",
    amountPerUse: ""
  })
  const [triggers, setTriggers] = useState({
    firstTime: "",
    situations: ["", "", ""],
    problemAreas: ["", "", ""]
  })
  const [patterns, setPatterns] = useState({
    usesAlone: null,
    publicPlace: null,
    timePerDose: ""
  })
  const [problems, setProblems] = useState({
    alcohol: "",
    tobacco: "",
    mainSubstance: ""
  })
  const [reasons, setReasons] = useState({
    first: "",
    second: ""
  })
  const [treatmentHistory, setTreatmentHistory] = useState({
    alcohol: {
      types: [],
      duration: "",
      startDate: "",
      completed: null
    },
    tobacco: {
      types: [],
      duration: "",
      startDate: "",
      completed: null
    },
    drugs: {
      types: [],
      duration: "",
      startDate: "",
      completed: null
    }
  })
  const [healthAndSocial, setHealthAndSocial] = useState({
    currentHealth: {
      receiving: false,
      reason: ""
    },
    consumptionProblems: "",
    socialPressure: "",
    supportNetwork: [
      { name: "", isSignificant: false },
      { name: "", isSignificant: false },
      { name: "", isSignificant: false }
    ],
    familyConsumption: [],
    familyConflict: {
      exists: false,
      description: ""
    }
  })
  const [functionalAnalysis, setFunctionalAnalysis] = useState({
    leisureActivities: [],
    otherActivities: "",
    mainActivities: ["", "", ""],
    relatedToConsumption: false
  })
  const [wellbeing, setWellbeing] = useState({
    lifestyleSatisfaction: "",
    frequentSadness: {
      exists: false,
      causes: ""
    },
    frequentAnxiety: {
      exists: false,
      causes: ""
    },
    suicidalThoughts: false
  })
  const [goals, setGoals] = useState("")
  const [consequences, setConsequences] = useState({
    health: 1,
    cognitive: 1,
    emotional: 1,
    interpersonal: 1,
    aggression: 1,
    legal: 1,
    economic: 1,
    work: 1
  })

  const renderSection = () => {
    switch (currentSection) {
      case "intro":
        return (
          <div className="space-y-4">
            <p>
              Hola {JSON.parse(localStorage.getItem("user"))?.username || "Usuario"}. Para poder ofrecerte el mejor apoyo posible, 
              necesitamos conocerte un poco mejor. Esta entrevista inicial nos ayuda a entender tu situación actual, tu historial 
              relacionado con el consumo y tus expectativas. Por favor, responde a las siguientes preguntas con la mayor sinceridad 
              posible. Tu información es confidencial y fundamental para tu proceso. Tómate tu tiempo.
            </p>
            <Button onClick={() => setCurrentSection("preScreening")} className="w-full">
              Comenzar
            </Button>
          </div>
        )

      case "preScreening":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Cuestionario de Preselección</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">La principal sustancia por la que estás buscando ayuda es:</label>
                <select
                  value={preScreening.mainSubstance}
                  onChange={(e) => setPreScreening(prev => ({
                    ...prev,
                    mainSubstance: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecciona una sustancia</option>
                  {substances.map(substance => (
                    <option key={substance.id} value={substance.id}>{substance.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">¿Eres mayor de 15 años?</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.isOver15 === true}
                      onChange={() => setPreScreening(prev => ({ ...prev, isOver15: true }))}
                      className="mr-2"
                    />
                    Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.isOver15 === false}
                      onChange={() => setPreScreening(prev => ({ ...prev, isOver15: false }))}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                if (!preScreening.mainSubstance || preScreening.isOver15 === null) {
                  toast({
                    title: "Completa todos los campos",
                    description: "Por favor, responde todas las preguntas antes de continuar",
                    variant: "destructive"
                  })
                  return
                }
                if (!preScreening.isOver15) {
                  toast({
                    title: "Criterio de edad no cumplido",
                    description: "Esta aplicación está diseñada para personas mayores de 15 años",
                    variant: "destructive"
                  })
                  return
                }
                setCurrentSection("identification")
              }}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )

      // ... Continuar con el resto de las secciones

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  )
}

export default UserInterview

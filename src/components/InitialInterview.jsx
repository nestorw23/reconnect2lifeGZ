
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

function InitialInterview() {
  const { toast } = useToast()
  const [currentSection, setCurrentSection] = useState("intro")
  const [preScreening, setPreScreening] = useState({
    mainSubstance: "",
    isOver15: null,
    canReadWrite: null
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
      otherDrugs: ""
    },
    mainRoute: "",
    frequency: "",
    amountPerUse: ""
  })
  const [triggers, setTriggers] = useState({
    firstTime: "",
    problematicSituations: ["", "", ""],
    problematicAreas: ["", "", ""]
  })
  const [patterns, setPatterns] = useState({
    usesAlone: null,
    publicPlace: null,
    timePerDose: ""
  })
  const [problems, setProblems] = useState({
    alcohol: "",
    tobacco: "",
    drugs: ""
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
      completed: ""
    },
    tobacco: {
      types: [],
      duration: "",
      startDate: "",
      completed: ""
    },
    drugs: {
      types: [],
      duration: "",
      startDate: "",
      completed: ""
    }
  })
  const [healthAndSocial, setHealthAndSocial] = useState({
    currentHealth: {
      hasIssues: false,
      description: ""
    },
    consumptionHealth: "",
    pressure: "",
    supportNetwork: [
      { name: "", isSignificant: false },
      { name: "", isSignificant: false },
      { name: "", isSignificant: false }
    ],
    networkConsumption: {
      father: { uses: false, substance: "", problems: false, description: "" },
      mother: { uses: false, substance: "", problems: false, description: "" },
      sibling: { uses: false, substance: "", problems: false, description: "" },
      friend: { uses: false, substance: "", problems: false, description: "" },
      relative: { uses: false, substance: "", problems: false, description: "" },
      partner: { uses: false, substance: "", problems: false, description: "" },
      other: { uses: false, substance: "", problems: false, description: "" }
    },
    familyConflict: {
      hasConflict: false,
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
    lifeSatisfaction: "",
    frequentSadness: {
      feels: false,
      causes: ""
    },
    frequentAnxiety: {
      feels: false,
      causes: ""
    },
    suicidalThoughts: false
  })
  const [futureGoals, setFutureGoals] = useState("")
  const [adverseConsequences, setAdverseConsequences] = useState({
    health: 0,
    cognitive: 0,
    emotional: 0,
    interpersonal: 0,
    aggression: 0,
    legal: 0,
    economic: 0,
    work: 0
  })

  const username = JSON.parse(localStorage.getItem("user"))?.username || "Usuario"

  const handleNext = () => {
    // Validación según la sección actual
    switch (currentSection) {
      case "preScreening":
        if (!preScreening.mainSubstance || preScreening.isOver15 === null || preScreening.canReadWrite === null) {
          toast({
            title: "Completa todos los campos",
            description: "Por favor, responde todas las preguntas de preselección",
            variant: "destructive"
          })
          return
        }
        if (!preScreening.isOver15 || !preScreening.canReadWrite) {
          toast({
            title: "No cumples con los criterios",
            description: "Esta entrevista requiere ser mayor de 15 años y saber leer y escribir",
            variant: "destructive"
          })
          return
        }
        break
      // Añadir validaciones para otras secciones...
    }

    // Determinar siguiente sección
    const sections = [
      "intro",
      "preScreening",
      "identification",
      "motivation",
      "substanceUse",
      "triggers",
      "patterns",
      "problems",
      "reasons",
      "treatmentHistory",
      "healthAndSocial",
      "functionalAnalysis",
      "wellbeing",
      "futureGoals",
      "adverseConsequences"
    ]
    
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1])
    } else {
      // Guardar toda la información
      const interviewData = {
        date: new Date().toISOString(),
        preScreening,
        identification,
        motivation,
        substanceUse,
        triggers,
        patterns,
        problems,
        reasons,
        treatmentHistory,
        healthAndSocial,
        functionalAnalysis,
        wellbeing,
        futureGoals,
        adverseConsequences
      }
      
      // Guardar en localStorage por ahora
      localStorage.setItem("initialInterview", JSON.stringify(interviewData))
      
      toast({
        title: "Entrevista completada",
        description: "La información ha sido guardada exitosamente",
      })
      
      setCurrentSection("intro")
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case "intro":
        return (
          <div className="space-y-4">
            <p>
              Hola {username}. Para poder ofrecerte el mejor apoyo posible, necesitamos conocerte un poco mejor. 
              Esta entrevista inicial nos ayuda a entender tu situación actual, tu historial relacionado con el consumo 
              y tus expectativas. Por favor, responde a las siguientes preguntas con la mayor sinceridad posible. 
              Tu información es confidencial y fundamental para tu proceso. Tómate tu tiempo.
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
                <label className="block mb-2">1. La principal sustancia por la que estás buscando ayuda es:</label>
                <input
                  type="text"
                  value={preScreening.mainSubstance}
                  onChange={(e) => setPreScreening(prev => ({
                    ...prev,
                    mainSubstance: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-2">2. ¿Eres mayor de 15 años?</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.isOver15 === true}
                      onChange={() => setPreScreening(prev => ({
                        ...prev,
                        isOver15: true
                      }))}
                      className="mr-2"
                    />
                    Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.isOver15 === false}
                      onChange={() => setPreScreening(prev => ({
                        ...prev,
                        isOver15: false
                      }))}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-2">3. ¿Sabes leer y escribir?</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.canReadWrite === true}
                      onChange={() => setPreScreening(prev => ({
                        ...prev,
                        canReadWrite: true
                      }))}
                      className="mr-2"
                    />
                    Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={preScreening.canReadWrite === false}
                      onChange={() => setPreScreening(prev => ({
                        ...prev,
                        canReadWrite: false
                      }))}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Siguiente
            </Button>
          </div>
        )

      // ... Implementar el resto de las secciones

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

export default InitialInterview

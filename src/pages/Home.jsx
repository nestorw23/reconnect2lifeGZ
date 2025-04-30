
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Medal, 
  Timer, 
  Heart, 
  Smile, 
  Frown, 
  AlertTriangle,
  Angry,
  Plus,
  Check,
  CheckSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

function Home() {
  const { toast } = useToast()
  const [username, setUsername] = useState("Usuario")
  const [objective, setObjective] = useState("")
  const [hasObjective, setHasObjective] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [doceavesDays, setDoceavesDays] = useState(null)
  const [treatmentDays, setTreatmentDays] = useState(0)
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [emotionalComment, setEmotionalComment] = useState("")
  const [customTasks, setCustomTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [showCustomTasks, setShowCustomTasks] = useState(false)

  // Función para obtener el icono de medalla según los días
  const getMedalIcon = () => {
    if (doceavesDays > 0) return "🏅" // icono doceavos
    if (treatmentDays < 21) return "🥉" // icono precontemplación
    if (treatmentDays < 54) return "🥈" // icono contemplación
    if (treatmentDays < 82) return "🥇" // icono preparación
    if (treatmentDays < 1095) return "🎖️" // icono acción
    return "🏆" // icono mantenimiento
  }

  // Actualizar tiempo restante del día
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date()
      const endOfDay = new Date(now)
      endOfDay.setHours(23, 59, 59, 999)
      const diff = endOfDay - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }

    const timer = setInterval(updateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  // Manejar el envío del objetivo
  const handleObjectiveSubmit = () => {
    if (!objective.trim()) {
      toast({
        title: "Por favor ingresa tu objetivo",
        description: "Necesitas ingresar qué esperas lograr para continuar",
        variant: "destructive",
      })
      return
    }
    setHasObjective(true)
  }

  // Manejar el inicio de los días doceavos
  const handleDoceavesDaysSubmit = (days) => {
    setDoceavesDays(parseInt(days))
    toast({
      title: "Días doceavos iniciados",
      description: "Comenzamos el conteo de tus días doceavos",
    })
  }

  // Manejar la selección de emociones
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion)
    // Aquí se guardaría en el calendario
  }

  // Manejar el comentario emocional
  const handleEmotionalComment = () => {
    if (emotionalComment.trim()) {
      // Aquí se guardaría en el calendario
      setEmotionalComment("")
    }
  }

  // Manejar nueva tarea personalizada
  const handleNewTask = () => {
    if (newTask.trim()) {
      setCustomTasks([...customTasks, { text: newTask, completed: false }])
      setNewTask("")
    }
  }

  // Tareas según la fase
  const getTasks = () => {
    if (doceavesDays > 0) {
      return [
        "Exámenes químicos",
        "Diagnóstico médico",
        "Tratamiento médico para desintoxicación",
        "Diagnóstico de satisfacción de vida",
        "Ver primeros capítulos de sesiones",
      ]
    }
    return [
      "Mantener higiene del sueño",
      "Consumir alimentos nutritivos",
      "30 minutos de deporte",
      "Agradecer por 3 relaciones",
      "Ver capítulos 3, 4 y 5",
    ]
  }

  if (!hasObjective) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">¡Hola {username}!</h1>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl">¿Qué esperas lograr ahora que inicias este duro viaje hacia la recuperación?</h2>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-4 border rounded-lg h-32"
              placeholder="Escribe tu objetivo aquí..."
            />
            <Button onClick={handleObjectiveSubmit} className="w-full">
              Comenzar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Sección Medalla y Objetivo */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-4xl">{getMedalIcon()}</div>
          <div className="flex-1 ml-4">
            <h2 className="text-xl font-bold">{objective}</h2>
            <p className="text-sm text-gray-500 italic">¿Cómo se supone que vamos a lograr eso?</p>
          </div>
        </div>
      </section>

      {/* Sección Contador */}
      <section className="bg-white rounded-lg p-6 shadow-lg space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{timeLeft}</h2>
          <p className="text-lg">Reconecta con tu día, solo te queda este tiempo hoy</p>
          <p className="text-sm text-gray-500">Viviendo 24 horas a la vez</p>
        </div>

        {doceavesDays === null ? (
          <div className="space-y-4">
            <p className="text-sm">
              ¿En cuántos días crees que saldrás de la fase aguda de abstinencia?
              Para la mayoría de las drogas suele durar entre 7 y 14 días.
            </p>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Número de días"
              min="1"
              onChange={(e) => handleDoceavesDaysSubmit(e.target.value)}
            />
          </div>
        ) : doceavesDays > 0 ? (
          <div className="text-center text-red-600">
            <h3 className="text-2xl font-bold">{doceavesDays} días</h3>
            <p className="text-sm mt-2">
              Estos son tus días doceavos. Te recomendamos aislarte si es posible.
            </p>
          </div>
        ) : (
          <div className="text-center text-green-600">
            <h3 className="text-2xl font-bold">{treatmentDays} días</h3>
            <p className="text-sm mt-2">
              ¡Felicidades! Has terminado los días más duros físicamente.
            </p>
          </div>
        )}
      </section>

      {/* Sección Tracker Emocional */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">¿Cómo te sientes?</h2>
        <div className="flex justify-around mb-4">
          <button onClick={() => handleEmotionSelect('amor')} className="p-2">
            <Heart className={`w-8 h-8 ${selectedEmotion === 'amor' ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
          <button onClick={() => handleEmotionSelect('felicidad')} className="p-2">
            <Smile className={`w-8 h-8 ${selectedEmotion === 'felicidad' ? 'text-yellow-500' : 'text-gray-400'}`} />
          </button>
          <button onClick={() => handleEmotionSelect('miedo')} className="p-2">
            <AlertTriangle className={`w-8 h-8 ${selectedEmotion === 'miedo' ? 'text-orange-500' : 'text-gray-400'}`} />
          </button>
          <button onClick={() => handleEmotionSelect('tristeza')} className="p-2">
            <Frown className={`w-8 h-8 ${selectedEmotion === 'tristeza' ? 'text-blue-500' : 'text-gray-400'}`} />
          </button>
          <button onClick={() => handleEmotionSelect('ira')} className="p-2">
            <Angry className={`w-8 h-8 ${selectedEmotion === 'ira' ? 'text-red-700' : 'text-gray-400'}`} />
          </button>
        </div>
        <textarea
          value={emotionalComment}
          onChange={(e) => setEmotionalComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="¿Qué estabas haciendo? ¿Dónde estabas? ¿Con quién estabas?"
        />
        <Button onClick={handleEmotionalComment} className="mt-2">
          Guardar
        </Button>
      </section>

      {/* Sección Daily Check List */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Tareas diarias</h2>
        <div className="space-y-2">
          {getTasks().map((task, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5" />
              <span>{task}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button
            onClick={() => setShowCustomTasks(!showCustomTasks)}
            variant="outline"
            className="w-full"
          >
            {showCustomTasks ? "Ocultar tareas personalizadas" : "Mostrar tareas personalizadas"}
          </Button>

          {showCustomTasks && (
            <div className="mt-4 space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Nueva tarea"
                />
                <Button onClick={handleNewTask}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {customTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

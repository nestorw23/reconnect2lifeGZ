
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  Smile,
  AlertTriangle,
  Frown,
  Angry,
  Plus,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

function Calendar() {
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewMode, setViewMode] = useState('month') // 'month' or 'week'
  const [events, setEvents] = useState([])
  const [emotionEntries, setEmotionEntries] = useState([])
  const [showDayEvaluation, setShowDayEvaluation] = useState(false)
  const [dayEvaluation, setDayEvaluation] = useState("")

  const emotions = [
    { icon: Heart, label: 'Amor', color: 'text-red-500' },
    { icon: Smile, label: 'Felicidad', color: 'text-yellow-500' },
    { icon: AlertTriangle, label: 'Miedo', color: 'text-orange-500' },
    { icon: Frown, label: 'Tristeza', color: 'text-blue-500' },
    { icon: Angry, label: 'Ira', color: 'text-red-700' }
  ]

  useEffect(() => {
    // Cargar eventos y emociones guardados
    const savedEvents = localStorage.getItem('calendarEvents')
    const savedEmotions = localStorage.getItem('emotionEntries')
    
    if (savedEvents) setEvents(JSON.parse(savedEvents))
    if (savedEmotions) setEmotionEntries(JSON.parse(savedEmotions))

    // Configurar notificaciones
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    // Guardar eventos y emociones
    localStorage.setItem('calendarEvents', JSON.stringify(events))
    localStorage.setItem('emotionEntries', JSON.stringify(emotionEntries))
  }, [events, emotionEntries])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // Añadir días del mes anterior para completar la primera semana
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i)
      days.unshift({ date: prevDate, isCurrentMonth: false })
    }
    
    // Añadir días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ 
        date: new Date(year, month, i), 
        isCurrentMonth: true 
      })
    }
    
    return days
  }

  const getCurrentWeek = () => {
    const curr = new Date(currentDate)
    const week = []
    
    // Empezar desde el domingo de la semana actual
    curr.setDate(curr.getDate() - curr.getDay())
    
    for (let i = 0; i < 7; i++) {
      week.push({
        date: new Date(curr),
        isCurrentMonth: curr.getMonth() === currentDate.getMonth()
      })
      curr.setDate(curr.getDate() + 1)
    }
    
    return week
  }

  const addEvent = () => {
    if (!selectedDate) return

    const eventTitle = prompt('Título del evento:')
    if (!eventTitle) return

    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      date: selectedDate,
      type: 'event'
    }

    setEvents([...events, newEvent])
    
    // Configurar recordatorios
    const eventDate = new Date(selectedDate)
    const oneDayBefore = new Date(eventDate)
    oneDayBefore.setDate(eventDate.getDate() - 1)
    
    // Programar notificaciones
    if ('Notification' in window && Notification.permission === 'granted') {
      // Notificación un día antes
      setTimeout(() => {
        new Notification('Recordatorio de evento', {
          body: `Mañana: ${eventTitle}`
        })
      }, oneDayBefore.getTime() - Date.now())
      
      // Notificación una hora antes
      setTimeout(() => {
        new Notification('Recordatorio de evento', {
          body: `En 1 hora: ${eventTitle}`
        })
      }, eventDate.getTime() - 3600000 - Date.now())
    }
  }

  const addEmotion = (emotion) => {
    if (!selectedDate) return

    const newEmotion = {
      id: Date.now(),
      emotion: emotion,
      date: selectedDate,
      time: new Date().toLocaleTimeString(),
      type: 'emotion'
    }

    setEmotionEntries([...emotionEntries, newEmotion])
    setShowDayEvaluation(true)
  }

  const saveDayEvaluation = () => {
    if (!dayEvaluation.trim()) return

    const newEvaluation = {
      id: Date.now(),
      text: dayEvaluation,
      date: selectedDate,
      type: 'evaluation'
    }

    setEmotionEntries([...emotionEntries, newEvaluation])
    setDayEvaluation("")
    setShowDayEvaluation(false)
    
    toast({
      title: "Evaluación guardada",
      description: "Tu evaluación del día ha sido guardada exitosamente",
    })
  }

  const getWeekSummary = () => {
    const weekStart = new Date(currentDate)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    return emotionEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= weekStart && entryDate <= weekEnd
    })
  }

  const renderCalendarDays = () => {
    const days = viewMode === 'month' ? getDaysInMonth(currentDate) : getCurrentWeek()
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center p-2 font-medium">
            {day}
          </div>
        ))}
        {days.map(({ date, isCurrentMonth }) => {
          const isSelected = selectedDate && 
            date.toDateString() === new Date(selectedDate).toDateString()
          const hasEvents = events.some(
            event => new Date(event.date).toDateString() === date.toDateString()
          )
          const hasEmotions = emotionEntries.some(
            entry => new Date(entry.date).toDateString() === date.toDateString()
          )

          return (
            <motion.button
              key={date.toISOString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-lg relative
                ${isCurrentMonth ? 'bg-card' : 'bg-muted text-muted-foreground'}
                ${isSelected ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => setSelectedDate(date.toISOString())}
            >
              <span>{date.getDate()}</span>
              {hasEvents && (
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-primary rounded-full" />
              )}
              {hasEmotions && (
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-yellow-500 rounded-full" />
              )}
            </motion.button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Controles del calendario */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setMonth(currentDate.getMonth() - 1)
              setCurrentDate(newDate)
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="font-medium">
            {currentDate.toLocaleDateString('es-ES', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
          <Button
            variant="ghost"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setMonth(currentDate.getMonth() + 1)
              setCurrentDate(newDate)
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            onClick={() => setViewMode('month')}
          >
            Mes
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            onClick={() => setViewMode('week')}
          >
            Semana
          </Button>
        </div>
      </div>

      {/* Calendario */}
      {renderCalendarDays()}

      {/* Acciones del día seleccionado */}
      {selectedDate && (
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              {new Date(selectedDate).toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </h4>
            <Button onClick={addEvent}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Evento
            </Button>
          </div>

          {/* Emociones */}
          <div className="space-y-2">
            <h5 className="font-medium">¿Cómo te sientes?</h5>
            <div className="flex space-x-4">
              {emotions.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  onClick={() => addEmotion(label)}
                  className="flex flex-col items-center"
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                  <span className="text-xs mt-1">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Evaluación del día */}
          {showDayEvaluation && (
            <div className="space-y-2">
              <h5 className="font-medium">Evalúa tu día</h5>
              <textarea
                value={dayEvaluation}
                onChange={(e) => setDayEvaluation(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="¿Qué pasó después? ¿Qué pensamientos y sensaciones tuviste?"
              />
              <Button onClick={saveDayEvaluation}>
                Guardar Evaluación
              </Button>
            </div>
          )}

          {/* Eventos del día */}
          <div className="space-y-2">
            <h5 className="font-medium">Eventos</h5>
            {events
              .filter(event => 
                new Date(event.date).toDateString() === 
                new Date(selectedDate).toDateString()
              )
              .map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <span>{event.title}</span>
                  <Bell className="w-4 h-4 text-primary" />
                </div>
              ))}
          </div>

          {/* Emociones registradas */}
          <div className="space-y-2">
            <h5 className="font-medium">Emociones Registradas</h5>
            {emotionEntries
              .filter(entry => 
                new Date(entry.date).toDateString() === 
                new Date(selectedDate).toDateString()
              )
              .map(entry => (
                <div
                  key={entry.id}
                  className="p-2 bg-muted rounded-md"
                >
                  {entry.type === 'emotion' ? (
                    <div className="flex items-center justify-between">
                      <span>{entry.emotion}</span>
                      <span className="text-sm text-muted-foreground">
                        {entry.time}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm">{entry.text}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Resumen Semanal */}
      {viewMode === 'week' && (
        <div className="mt-4 p-4 bg-card rounded-lg">
          <h4 className="font-medium mb-2">Resumen Semanal</h4>
          <div className="space-y-2">
            {getWeekSummary().map(entry => (
              <div
                key={entry.id}
                className="p-2 bg-muted rounded-md"
              >
                <div className="flex items-center justify-between">
                  <span>
                    {entry.type === 'emotion' ? entry.emotion : 'Evaluación'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                {entry.type === 'evaluation' && (
                  <p className="text-sm mt-1">{entry.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar

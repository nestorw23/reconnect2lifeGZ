
import React from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Calendar as CalendarIcon, 
  Star, 
  Upload, 
  Phone, 
  Edit,
  Check,
  Heart,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Calendar from "@/components/Calendar"

function Profile() {
  const { toast } = useToast()
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })
  const [editingUsername, setEditingUsername] = React.useState(false)
  const [newUsername, setNewUsername] = React.useState(user?.username || "")
  const [abstinenceDate, setAbstinenceDate] = React.useState("")
  const [abstinenceDays, setAbstinenceDays] = React.useState(0)
  const [abstinenceYearsMonths, setAbstinenceYearsMonths] = React.useState({ years: 0, months: 0 })
  const [showEmergencyContacts, setShowEmergencyContacts] = React.useState(false)
  const [showPlanProcess, setShowPlanProcess] = React.useState(false)
  const [contacts, setContacts] = React.useState({
    companions: [],
    friends: [],
    family: []
  })
  const [planProcess, setPlanProcess] = React.useState({
    values: "",
    lifePurpose: "",
    objectives: [],
    goals: "",
    actions: "",
    currentTheme: "",
    dailyTasks: [],
    weaknesses: "",
    strengths: ""
  })

  // Calcular días de abstinencia
  React.useEffect(() => {
    if (abstinenceDate) {
      const start = new Date(abstinenceDate)
      const today = new Date()
      const diffTime = Math.abs(today - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setAbstinenceDays(diffDays)

      // Calcular años y meses
      const years = Math.floor(diffDays / 365)
      const months = Math.floor((diffDays % 365) / 30)
      setAbstinenceYearsMonths({ years, months })

      // Mostrar felicitaciones según los hitos
      if (diffDays === 1) {
        toast({
          title: "¡Felicitaciones!",
          description: "Has completado tu primer día de abstinencia",
        })
      } else if (diffDays === 7) {
        toast({
          title: "¡Una semana!",
          description: "Has completado tu primera semana de abstinencia",
        })
      } // ... más hitos
    }
  }, [abstinenceDate])

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      setUser(prev => ({ ...prev, username: newUsername }))
      localStorage.setItem("user", JSON.stringify({ ...user, username: newUsername }))
      setEditingUsername(false)
      toast({
        title: "Nombre actualizado",
        description: "Tu nombre de usuario ha sido actualizado exitosamente",
      })
    }
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Aquí iría la lógica para subir la foto
      toast({
        title: "Foto actualizada",
        description: "Tu foto de perfil ha sido actualizada exitosamente",
      })
    }
  }

  const addEmergencyContact = (category) => {
    const newContact = {
      name: prompt("Nombre del contacto:"),
      phone: prompt("Número de teléfono:"),
      note: prompt("Nota sobre cómo puede ayudar:"),
      isAware: false
    }
    if (newContact.name && newContact.phone) {
      setContacts(prev => ({
        ...prev,
        [category]: [...prev[category], newContact]
      }))
    }
  }

  return (
    <div className="container p-4 space-y-6 pb-20">
      {/* Sección Perfil */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tu Perfil</h2>
        </div>

        {/* Nombre/Alias */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          {editingUsername ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Nuevo nombre o alias"
              />
              <Button onClick={handleUsernameChange}>
                <Check className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nombre/Alias</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <Button variant="ghost" onClick={() => setEditingUsername(true)}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Foto de Perfil */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Foto de Perfil</h3>
              <label className="cursor-pointer text-primary text-sm">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                Cambiar foto
              </label>
            </div>
          </div>
        </div>

        {/* Fecha de Inicio de Abstinencia */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Fecha de Inicio de Abstinencia</h3>
          <input
            type="date"
            value={abstinenceDate}
            onChange={(e) => setAbstinenceDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {abstinenceDays > 0 && (
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">{abstinenceDays} días</p>
              <p className="text-muted-foreground">
                {abstinenceYearsMonths.years} años y {abstinenceYearsMonths.months} meses
              </p>
            </div>
          )}
        </div>

        {/* Contactos de Emergencia */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
          >
            <h3 className="font-medium">Contactos de Emergencia</h3>
            {showEmergencyContacts ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showEmergencyContacts && (
            <div className="space-y-4">
              {Object.entries(contacts).map(([category, contactList]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="capitalize">{category}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => addEmergencyContact(category)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {contactList.map((contact, index) => (
                    <div key={index} className="p-2 bg-muted rounded">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="checkbox"
                          checked={contact.isAware}
                          onChange={() => {
                            const newContacts = { ...contacts }
                            newContacts[category][index].isAware = !contact.isAware
                            setContacts(newContacts)
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">Contacto informado</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plan de Proceso */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowPlanProcess(!showPlanProcess)}
          >
            <h3 className="font-medium">Plan de Proceso</h3>
            {showPlanProcess ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showPlanProcess && (
            <div className="space-y-4">
              {/* Valores */}
              <div>
                <h4 className="font-medium">Valores</h4>
                <textarea
                  value={planProcess.values}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, values: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="¿En qué crees? ¿Por qué haces lo que haces?"
                />
              </div>

              {/* Sentido de Vida */}
              <div>
                <h4 className="font-medium">Sentido de Vida</h4>
                <textarea
                  value={planProcess.lifePurpose}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, lifePurpose: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="¿Para qué vives?"
                />
              </div>

              {/* Objetivos */}
              <div>
                <h4 className="font-medium">Objetivos (3-5 años)</h4>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    const newObjective = prompt("Nuevo objetivo:")
                    if (newObjective) {
                      setPlanProcess(prev => ({
                        ...prev,
                        objectives: [...prev.objectives, newObjective]
                      }))
                    }
                  }}
                >
                  Añadir Objetivo
                </Button>
                {planProcess.objectives.map((objective, index) => (
                  <div key={index} className="p-2 bg-muted rounded mt-2">
                    {objective}
                  </div>
                ))}
              </div>

              {/* Metas */}
              <div>
                <h4 className="font-medium">Metas (6 meses - 1 año)</h4>
                <textarea
                  value={planProcess.goals}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, goals: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Tus metas a mediano plazo"
                />
              </div>

              {/* Acciones */}
              <div>
                <h4 className="font-medium">Acciones (Trimestre)</h4>
                <textarea
                  value={planProcess.actions}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, actions: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="¿Qué acciones tomarás este trimestre?"
                />
              </div>

              {/* Tema Actual */}
              <div>
                <h4 className="font-medium">Tema a Mejorar Ahora</h4>
                <input
                  type="text"
                  value={planProcess.currentTheme}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, currentTheme: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Tu tema personal actual"
                />
              </div>

              {/* Debilidades */}
              <div>
                <h4 className="font-medium">Debilidades</h4>
                <textarea
                  value={planProcess.weaknesses}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, weaknesses: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Tus áreas de mejora"
                />
              </div>

              {/* Fortalezas */}
              <div>
                <h4 className="font-medium">Fortalezas</h4>
                <textarea
                  value={planProcess.strengths}
                  onChange={(e) => setPlanProcess(prev => ({ ...prev, strengths: e.target.value }))}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Tus puntos fuertes"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sección Calendario */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Calendario</h2>
        <div className="bg-card rounded-lg p-4">
          <Calendar />
        </div>
      </section>

      {/* Sección Rachas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Rachas</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 text-center">
            <h3 className="font-medium">Tareas Realizadas</h3>
            <p className="text-3xl font-bold text-primary mt-2">7</p>
            <p className="text-sm text-muted-foreground">días seguidos</p>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <h3 className="font-medium">Sesiones Asistidas</h3>
            <p className="text-3xl font-bold text-primary mt-2">15</p>
            <p className="text-sm text-muted-foreground">sesiones totales</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile

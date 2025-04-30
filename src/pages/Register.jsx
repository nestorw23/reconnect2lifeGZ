import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

function Register() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [roleSubmitLoading, setRoleSubmitLoading] = useState(false)
  const [roleSubmitError, setRoleSubmitError] = useState(null)

  const roles = [
    {
      id: "consumer",
      label: "Persona en Recuperación",
      description: "Estoy buscando apoyo para mi proceso de recuperación"
    },
    {
      id: "family",
      label: "Familiar",
      description: "Estoy apoyando a un ser querido en su recuperación"
    },
    {
      id: "therapist",
      label: "Terapeuta",
      description: "Soy un profesional ayudando a otros en su recuperación"
    },
    {
      id: "doctor",
      label: "Médico",
      description: "Soy un profesional médico apoyando la recuperación"
    },
    {
      id: "residence",
      label: "Residencia",
      description: "Soy una institución que ofrece tratamiento residencial"
    },
  ]

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setSelectedTreatment(null)
  }

  const handleInitialSignUp = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    // Validación básica del formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const trimmedEmail = email.trim()
    
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive",
      })
      return
    }

    // Validación de longitud mínima de contraseña
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      console.log('Register: Attempting signUp with:', { email: trimmedEmail })
      
      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      })

      if (error) {
        console.error('Register: SignUp error:', error)
        throw error
      }

      console.log('Register: SignUp successful')
      toast({
        title: "¡Registro casi listo!",
        description: "Revisa tu bandeja de entrada (y spam) para confirmar tu correo electrónico.",
        duration: 5000,
      })
      setShowRoleSelection(true)
    } catch (error) {
      console.error('Register: ERROR in handleInitialSignUp:', error)
      toast({
        title: "Error al registrarse",
        description: error.message || "Ocurrió un error al intentar registrarte. Por favor, intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleSubmit = async () => {
    console.log('Register: handleRoleSubmit started', { selectedRole, selectedTreatment });

    if (!selectedRole) {
      toast({
        title: "Por favor selecciona un rol",
        description: "Necesitas seleccionar un rol para continuar",
        variant: "destructive",
      })
      return
    }

    if ((selectedRole.id === "consumer" || selectedRole.id === "therapist" || selectedRole.id === "doctor") && !selectedTreatment) {
      toast({
        title: "Por favor selecciona una modalidad",
        description: "Necesitas seleccionar la modalidad para continuar",
        variant: "destructive",
      })
      return
    }

    try {
      setRoleSubmitLoading(true)
      setRoleSubmitError(null)

      console.log('Register: Attempting to get user...');
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('Register: getUser result:', { user, userError });
      
      if (userError) throw userError
      if (!user) throw new Error("No se encontró el usuario autenticado")

      // Determinar el sub_role basado en el rol y tratamiento seleccionado
      let sub_role = null
      if (selectedRole.id === "consumer") {
        sub_role = selectedTreatment === "consumer-residential" ? "consumer_residential" : "consumer_home"
      } else if (selectedRole.id === "therapist") {
        sub_role = selectedTreatment === "therapist-residential" ? "therapist_residential" : "therapist_home"
      } else if (selectedRole.id === "doctor") {
        sub_role = selectedTreatment === "doctor-residential" ? "doctor_residential" : "doctor_home"
      }

      const userData = {
        id: user.id,
        email: user.email,
        role: selectedRole.id,
        sub_role: sub_role,
        updated_at: new Date().toISOString()
      }

      console.log('Register: Attempting upsert with:', userData);
      const { error: upsertError } = await supabase
        .from('users')
        .upsert(userData)
      console.log('Register: upsert result:', { upsertError });

      if (upsertError) throw upsertError

      // Determinar la ruta de navegación
      let navigatePath = '/'
      if (selectedRole.id === 'consumer') {
        navigatePath = selectedTreatment === 'consumer-residential' ? '/record-consumer-residential' : '/payment'
      } else if (selectedRole.id === 'family') {
        navigatePath = '/record-family'
      } else if (selectedRole.id === 'therapist') {
        navigatePath = selectedTreatment === 'therapist-residential' ? '/record-therapist-residential' : '/record-therapist-home'
      } else if (selectedRole.id === 'doctor') {
        navigatePath = selectedTreatment === 'doctor-residential' ? '/record-doctor-residential' : '/record-doctor-home'
      } else if (selectedRole.id === 'residence') {
        navigatePath = '/record-residence'
      }

      console.log('Register: Upsert successful, attempting to navigate to:', navigatePath);
      navigate(navigatePath)

    } catch (error) {
      console.error('Register: ERROR in handleRoleSubmit:', error);
      setRoleSubmitError(error.message)
      toast({
        title: "Error al guardar el rol",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      console.log('Register: handleRoleSubmit finally block, setting loading false.');
      setRoleSubmitLoading(false)
    }
  }

  if (!showRoleSelection) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">ReConnect2Life</h1>
            <p className="mt-2 text-muted-foreground">
              Crea tu cuenta para comenzar
            </p>
          </div>

          <form onSubmit={handleInitialSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input px-3 py-2"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input px-3 py-2"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>

          <p className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">ReConnect2Life</h1>
            <p className="mt-2 text-muted-foreground">
              Configura tu perfil
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Elige tu rol:</h2>
            {roles.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className={`w-full p-4 rounded-lg border ${
                    selectedRole?.id === role.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  } text-left transition-all`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <h3 className="font-medium">{role.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </button>
              </motion.div>
            ))}

            {selectedRole?.id === "consumer" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">
                  Selecciona tu modalidad de tratamiento:
                </h3>
                <RadioGroup
                  value={selectedTreatment}
                  onValueChange={setSelectedTreatment}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consumer-residential" id="residential" />
                    <Label htmlFor="residential">Tratamiento Residencial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consumer-home" id="home" />
                    <Label htmlFor="home">Tratamiento Desde Casa</Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}

            {selectedRole?.id === "therapist" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">
                  Indica tu modalidad de trabajo:
                </h3>
                <RadioGroup
                  value={selectedTreatment}
                  onValueChange={setSelectedTreatment}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="therapist-residential" id="therapist-residential" />
                    <Label htmlFor="therapist-residential">Trabajo en una Residencia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="therapist-home" id="therapist-home" />
                    <Label htmlFor="therapist-home">Trabajo Desde Casa</Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}

            {selectedRole?.id === "doctor" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">
                  Indica tu modalidad de trabajo:
                </h3>
                <RadioGroup
                  value={selectedTreatment}
                  onValueChange={setSelectedTreatment}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor-residential" id="doctor-residential" />
                    <Label htmlFor="doctor-residential">Trabajo en una Residencia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor-home" id="doctor-home" />
                    <Label htmlFor="doctor-home">Trabajo Desde Casa</Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleRoleSubmit}
            disabled={roleSubmitLoading}
          >
            Continuar
          </Button>

          {roleSubmitError && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-destructive text-sm">{roleSubmitError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, CheckSquare, CreditCard, Stethoscope, Users, Calendar, Search, Filter, ChevronDown, ChevronUp, Plus, AlertCircle, Clock, Heart, MessageSquare, Phone, Mail, Brain } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

function HomeFamilyMember() {
  const [expandedRows, setExpandedRows] = useState({})

  // Datos de ejemplo de un único paciente
  const paciente = {
    id: 'paciente1',
    nombre: 'Juan Pérez',
    fechaIngreso: '15/03/2024',
    contadorTiempo: '30 días 08:15:00',
    etapaRehabilitacion: 'precontemplacion',
    observacionesMedicas: 'El paciente muestra mejoría en su estado de ánimo y disposición al tratamiento.',
    medicacion: 'Medicamento A: 1 comprimido cada 8 horas\nMedicamento B: 2 comprimidos al día',
    proximaCita: '25/04/2024 - 10:00 AM',
    recomendacionesPaciente: 'Mantener horarios regulares de sueño\nRealizar ejercicio moderado diariamente\nAsistir a todas las sesiones de terapia\nPracticar técnicas de relajación aprendidas',
    recomendacionesFamiliar: 'Fomentar la comunicación abierta\nAcompañar al paciente en sus actividades diarias\nMantener un ambiente tranquilo en casa\nAsistir a las sesiones familiares programadas',
    observacionesPsicologicas: 'El paciente muestra avances significativos en el manejo de la ansiedad. Se recomienda continuar con las técnicas de respiración y mantener el diario emocional. Se observa mayor apertura en las sesiones grupales.'
  }

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel del Familiar</h1>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Paciente (vía Key)
          </Button>
        </div>

        {/* Tarjeta principal del paciente */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{paciente.nombre}</h2>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Ingreso: {paciente.fechaIngreso}</span>
              </div>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">{paciente.contadorTiempo}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Etapa de Rehabilitación */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Etapa de Rehabilitación</h3>
              <select className="w-full p-2 border rounded bg-white" disabled>
                <option value="precontemplacion" selected={paciente.etapaRehabilitacion === 'precontemplacion'}>Precontemplación</option>
                <option value="contemplacion" selected={paciente.etapaRehabilitacion === 'contemplacion'}>Contemplación</option>
                <option value="preparacion" selected={paciente.etapaRehabilitacion === 'preparacion'}>Preparación</option>
                <option value="accion" selected={paciente.etapaRehabilitacion === 'accion'}>Acción</option>
                <option value="mantenimiento" selected={paciente.etapaRehabilitacion === 'mantenimiento'}>Mantenimiento</option>
              </select>
            </div>

            {/* Próxima Cita */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Próxima Cita</h3>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{paciente.proximaCita}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Información Detallada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Observaciones Médicas */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-primary" />
              Observaciones Médicas
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{paciente.observacionesMedicas}</p>
            </div>
          </div>

          {/* Medicación Actual */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Medicación Actual
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{paciente.medicacion}</p>
            </div>
          </div>
        </div>

        {/* Recomendaciones y Observaciones Psicológicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recomendaciones para el Paciente */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Recomendaciones para el Paciente
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{paciente.recomendacionesPaciente}</p>
            </div>
          </div>

          {/* Recomendaciones para el Familiar */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Recomendaciones para el Familiar
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{paciente.recomendacionesFamiliar}</p>
            </div>
          </div>
        </div>

        {/* Observaciones Psicológicas */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            Observaciones Psicológicas
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{paciente.observacionesPsicologicas}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFamilyMember

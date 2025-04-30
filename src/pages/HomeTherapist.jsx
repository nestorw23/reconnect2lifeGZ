import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, CheckSquare, CreditCard, Stethoscope, Users, Calendar, Search, Filter, ChevronDown, ChevronUp, Plus, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

function HomeTherapist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState({
    from: null,
    to: null
  })
  const [expandedRows, setExpandedRows] = useState({})
  const [expandedSessions, setExpandedSessions] = useState({})
  const [sessionNotes, setSessionNotes] = useState({})

  // Datos de ejemplo
  const pacientes = [
    {
      id: 'paciente1',
      nombre: '[Nombre Paciente 1]',
      fechaIngreso: '15/03/2024',
      contadorTiempo: '[30 días 08:15:00]',
      etapaRehabilitacion: 'precontemplacion'
    },
    {
      id: 'paciente2',
      nombre: '[Nombre Paciente 2]',
      fechaIngreso: '20/03/2024',
      contadorTiempo: '[45 días 12:20:00]',
      etapaRehabilitacion: 'contemplacion'
    }
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDateFilter = (e) => {
    const date = e.target.value
    setDateFilter(prev => ({ ...prev, from: date }))
  }

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const toggleSession = (pacienteId, sessionId) => {
    setExpandedSessions(prev => ({
      ...prev,
      [`${pacienteId}-${sessionId}`]: !prev[`${pacienteId}-${sessionId}`]
    }))
  }

  const handleSessionNote = (pacienteId, sessionId, note) => {
    setSessionNotes(prev => ({
      ...prev,
      [`${pacienteId}-${sessionId}`]: note
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Panel del Terapeuta</h1>
      
      <Button className="w-full mb-8 bg-primary hover:bg-primary/90">
        Agregar Paciente (vía Key)
      </Button>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Mis Pacientes Vinculados</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span>Nombre Paciente</span>
                    <div className="relative">
                      <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-2" />
                      <input
                        type="text"
                        placeholder="Buscar paciente..."
                        className="pl-8 w-48 border rounded-md p-2"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </th>
                <th className="text-left py-3 px-4">Fecha de Ingreso</th>
                <th className="text-left py-3 px-4">Contador Tiempo</th>
                <th className="text-left py-3 px-4">Etapa de Rehabilitación</th>
                <th className="text-left py-3 px-4">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <React.Fragment key={paciente.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">{paciente.nombre}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{paciente.fechaIngreso}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{paciente.contadorTiempo}</td>
                    <td className="py-4 px-4">
                      <select className="w-full p-2 border rounded bg-white">
                        <option value="precontemplacion" selected={paciente.etapaRehabilitacion === 'precontemplacion'}>Precontemplación</option>
                        <option value="contemplacion" selected={paciente.etapaRehabilitacion === 'contemplacion'}>Contemplación</option>
                        <option value="preparacion" selected={paciente.etapaRehabilitacion === 'preparacion'}>Preparación</option>
                        <option value="accion" selected={paciente.etapaRehabilitacion === 'accion'}>Acción</option>
                        <option value="mantenimiento" selected={paciente.etapaRehabilitacion === 'mantenimiento'}>Mantenimiento</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => toggleRow(paciente.id)}
                      >
                        {expandedRows[paciente.id] ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Ocultar Detalles
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Ver Detalles
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                  {expandedRows[paciente.id] && (
                    <tr className="border-b hover:bg-gray-50">
                      <td colSpan="5" className="py-4 px-4">
                        <div className="space-y-6">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-4">Registro de Sesiones</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {[...Array(24)].map((_, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Checkbox id={`session-${paciente.id}-${index}`} />
                                      <label htmlFor={`session-${paciente.id}-${index}`} className="text-sm">
                                        Sesión {index + 1}
                                      </label>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleSession(paciente.id, index)}
                                    >
                                      {expandedSessions[`${paciente.id}-${index}`] ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  {expandedSessions[`${paciente.id}-${index}`] && (
                                    <div className="space-y-4 mt-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Observaciones</label>
                                        <textarea
                                          placeholder="Ingrese observaciones de la sesión..."
                                          value={sessionNotes[`${paciente.id}-${index}`] || ''}
                                          onChange={(e) => handleSessionNote(paciente.id, index, e.target.value)}
                                          className="w-full p-2 border rounded-md min-h-[100px]"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Tipo de Sesión</label>
                                        <select className="w-full p-2 border rounded">
                                          <option value="">Seleccione tipo de sesión</option>
                                          <option value="entrevista">Entrevista Familiar</option>
                                          <option value="diagnostico">Diagnóstico</option>
                                          <option value="severidad">Severidad de Consumo</option>
                                          <option value="psicometricas">Pruebas Psicométricas</option>
                                          <option value="tratamiento">Tratamiento</option>
                                          <option value="satisfaccion">Satisfacción de Vida</option>
                                          <option value="ansiedad">Pruebas de Ansiedad</option>
                                          <option value="depresion">Pruebas de Depresión</option>
                                        </select>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomeTherapist

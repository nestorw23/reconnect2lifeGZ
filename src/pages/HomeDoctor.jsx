import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Stethoscope, Users, Calendar, Search, Filter, ChevronDown, ChevronUp, Plus, AlertCircle, Clock, Heart, MessageSquare, Brain, ClipboardList, Activity } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

function HomeDoctor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState({
    from: null,
    to: null
  })
  const [expandedRows, setExpandedRows] = useState({})
  const [expandedSignosVitales, setExpandedSignosVitales] = useState({})

  // Datos de ejemplo
  const pacientes = [
    {
      id: 'paciente1',
      nombre: 'Juan Pérez',
      fechaIngreso: '15/03/2024',
      contadorTiempo: '30 días 08:15:00',
      observacionesMedicas: 'El paciente muestra mejoría en su estado de ánimo y disposición al tratamiento.',
      medicacion: 'Medicamento A: 1 comprimido cada 8 horas\nMedicamento B: 2 comprimidos al día',
      signosVitales: [
        { fecha: '15/03/2024', presion: '120/80', temperatura: '36.5', frecuenciaCardiaca: '72', saturacion: '98' },
        { fecha: '22/03/2024', presion: '118/78', temperatura: '36.7', frecuenciaCardiaca: '70', saturacion: '99' },
        { fecha: '29/03/2024', presion: '115/75', temperatura: '36.6', frecuenciaCardiaca: '68', saturacion: '98' }
      ],
      notasMedicas: [
        { tipo: 'valoracion_ingreso', fecha: '15/03/2024', contenido: 'Nota de valoración inicial del paciente...' },
        { tipo: 'nota_evolucion', fecha: '22/03/2024', contenido: 'Evolución favorable del paciente...' },
        { tipo: 'nota_evolucion', fecha: '29/03/2024', contenido: 'Continuar con el tratamiento actual...' }
      ]
    },
    {
      id: 'paciente2',
      nombre: 'María García',
      fechaIngreso: '20/03/2024',
      contadorTiempo: '25 días 12:20:00',
      etapaRehabilitacion: 'contemplacion',
      observacionesMedicas: 'Se recomienda ajustar la medicación...',
      medicacion: 'Medicamento C: 2 comprimidos al día\nMedicamento D: 1 comprimido cada 12 horas',
      notasMedicas: [
        { tipo: 'valoracion_ingreso', fecha: '20/03/2024', contenido: 'Valoración inicial del paciente...' },
        { tipo: 'nota_evolucion', fecha: '27/03/2024', contenido: 'Progreso en el tratamiento...' }
      ]
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

  const toggleSignosVitales = (id) => {
    setExpandedSignosVitales(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel del Médico</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Paciente
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
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
                          {/* Información Médica */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <h3 className="font-semibold mb-3 flex items-center">
                                <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                                Observaciones Médicas
                              </h3>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm">{paciente.observacionesMedicas}</p>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <h3 className="font-semibold mb-3 flex items-center">
                                <Heart className="h-5 w-5 mr-2 text-primary" />
                                Medicación Actual
                              </h3>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm whitespace-pre-line">{paciente.medicacion}</p>
                              </div>
                            </div>
                          </div>

                          {/* Notas Médicas */}
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-4 flex items-center">
                              <ClipboardList className="h-5 w-5 mr-2 text-primary" />
                              Notas Médicas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                Valoración de Ingreso
                              </Button>
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                Nota de Evolución
                              </Button>
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                Valoración de Egreso
                              </Button>
                            </div>
                            <div className="mt-4 space-y-4">
                              {paciente.notasMedicas.map((nota, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">
                                      {nota.tipo === 'valoracion_ingreso' ? 'Valoración de Ingreso' :
                                       nota.tipo === 'nota_evolucion' ? 'Nota de Evolución' :
                                       'Valoración de Egreso'}
                                    </span>
                                    <span className="text-sm text-gray-500">{nota.fecha}</span>
                                  </div>
                                  <p className="text-sm">{nota.contenido}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Signos Vitales - Colapsable */}
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full flex items-center justify-between mb-4"
                              onClick={() => toggleSignosVitales(paciente.id)}
                            >
                              <div className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-primary" />
                                <span className="font-semibold">Signos Vitales</span>
                              </div>
                              {expandedSignosVitales[paciente.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            
                            {expandedSignosVitales[paciente.id] && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">Última Medición</p>
                                    <p className="text-lg font-semibold">{paciente.signosVitales[paciente.signosVitales.length - 1].fecha}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">Presión Arterial</p>
                                    <p className="text-lg font-semibold">{paciente.signosVitales[paciente.signosVitales.length - 1].presion}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">Temperatura</p>
                                    <p className="text-lg font-semibold">{paciente.signosVitales[paciente.signosVitales.length - 1].temperatura}°C</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">Frecuencia Cardíaca</p>
                                    <p className="text-lg font-semibold">{paciente.signosVitales[paciente.signosVitales.length - 1].frecuenciaCardiaca} lpm</p>
                                  </div>
                                </div>
                                <div className="h-64 bg-white rounded-lg p-4">
                                  {/* Aquí irá la gráfica de evolución de signos vitales */}
                                  <p className="text-center text-gray-500">Gráfica de evolución de signos vitales</p>
                                </div>
                              </div>
                            )}
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

export default HomeDoctor

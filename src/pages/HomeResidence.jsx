import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, CheckSquare, CreditCard, Stethoscope, Users, Calendar, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

function HomeResidence() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState({
    from: null,
    to: null
  })
  const [expandedRows, setExpandedRows] = useState({})

  // Datos de ejemplo
  const pacientes = [
    {
      id: 'paciente1',
      nombre: '[Nombre Paciente Residente 1]',
      fechaIngreso: '15/03/2024',
      contadorTiempo: '[30 días 08:15:00]',
      estado: 'no_pagado',
      monto: 499
    },
    {
      id: 'paciente2',
      nombre: '[Nombre Paciente Residente 2]',
      fechaIngreso: '20/03/2024',
      contadorTiempo: '[45 días 12:20:00]',
      estado: 'pagado',
      monto: 499
    }
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    // Aquí se implementaría la lógica de búsqueda
  }

  const handleDateFilter = (e) => {
    const date = e.target.value
    setDateFilter(prev => ({ ...prev, from: date }))
    // Aquí se implementaría la lógica de filtrado por fechas
  }

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Calcular total a pagar
  const totalAPagar = pacientes
    .filter(paciente => paciente.estado === 'no_pagado')
    .reduce((total, paciente) => total + paciente.monto, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Panel de la Residencia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button className="bg-primary hover:bg-primary/90">
          Crear Persona Recuperación (Residencial)
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          Crear Terapeuta (Residencia)
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          Crear Médico (Residencia)
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Pacientes Residentes Registrados</h2>
        
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
                <th className="text-left py-3 px-4">Asignar Terapeuta</th>
                <th className="text-left py-3 px-4">Asignar Médico</th>
                <th className="text-left py-3 px-4">Contador Tiempo</th>
                <th className="text-left py-3 px-4">Estado Expediente</th>
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
                    <td className="py-4 px-4">
                      <select className="w-full p-2 border rounded">
                        <option>[Selector Terapeuta Placeholder]</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <select className="w-full p-2 border rounded">
                        <option>[Selector Médico Placeholder]</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">{paciente.contadorTiempo}</td>
                    <td className="py-4 px-4">
                      {paciente.estado === 'pagado' ? (
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Pagado
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ${paciente.monto} MXN
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                            No Pagado
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ${paciente.monto} MXN
                          </span>
                        </div>
                      )}
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
                      <td colSpan="7" className="py-4 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Medicación y Observaciones</h4>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="font-medium">Medicación Actual:</span> [Medicación asignada por el médico]</p>
                                <p className="text-sm"><span className="font-medium">Observaciones:</span> [Resumen de notas de ingreso/evolución]</p>
                              </div>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Etapa de Rehabilitación</h4>
                              <select className="w-full p-2 border rounded bg-white">
                                <option value="precontemplacion">Precontemplación</option>
                                <option value="contemplacion">Contemplación</option>
                                <option value="preparacion">Preparación</option>
                                <option value="accion">Acción</option>
                                <option value="mantenimiento">Mantenimiento</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Checklist</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`mp-${paciente.id}`} />
                                  <label htmlFor={`mp-${paciente.id}`} className="text-sm">Notificación MP</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`eq-${paciente.id}`} />
                                  <label htmlFor={`eq-${paciente.id}`} className="text-sm">Exámenes Químicos</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`vp-${paciente.id}`} />
                                  <label htmlFor={`vp-${paciente.id}`} className="text-sm">Valoración Psiquiátrica</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v1-${paciente.id}`} />
                                  <label htmlFor={`v1-${paciente.id}`} className="text-sm">1ra Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v2-${paciente.id}`} />
                                  <label htmlFor={`v2-${paciente.id}`} className="text-sm">2da Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v3-${paciente.id}`} />
                                  <label htmlFor={`v3-${paciente.id}`} className="text-sm">3ra Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v4-${paciente.id}`} />
                                  <label htmlFor={`v4-${paciente.id}`} className="text-sm">4ta Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v5-${paciente.id}`} />
                                  <label htmlFor={`v5-${paciente.id}`} className="text-sm">5ta Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`v6-${paciente.id}`} />
                                  <label htmlFor={`v6-${paciente.id}`} className="text-sm">6ta Visita</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id={`ef-${paciente.id}`} />
                                  <label htmlFor={`ef-${paciente.id}`} className="text-sm">Entrevista Familiar</label>
                                </div>
                              </div>
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

      <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total a Pagar Expedientes:</p>
          <p className="text-2xl font-bold text-primary">${totalAPagar} MXN</p>
          <p className="text-sm text-muted-foreground mt-1">
            {pacientes.filter(p => p.estado === 'no_pagado').length} expediente(s) pendiente(s) de pago
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2 text-lg py-6 px-8">
          <CreditCard className="h-6 w-6" />
          Pagar Expedientes Ahora
        </Button>
      </div>
    </div>
  )
}

export default HomeResidence


import React from "react"

function TherapistFileManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Gestión de Expedientes de Pacientes</h1>
      
      <ul className="space-y-4">
        <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
          Paciente 1 - Hacer clic para ver detalles
        </li>
        <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
          Paciente 2 - Hacer clic para ver detalles
        </li>
        <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
          Paciente 3 - Hacer clic para ver detalles
        </li>
      </ul>
    </div>
  )
}

export default TherapistFileManagementPage

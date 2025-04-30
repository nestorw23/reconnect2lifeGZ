
import React from "react"

function MedicalNoteHeader({ note, setNote }) {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="datetime-local"
          value={note.date}
          onChange={(e) => setNote(prev => ({ ...prev, date: e.target.value }))}
          className="p-2 border rounded"
        />
        <select
          value={note.encounterType}
          onChange={(e) => setNote(prev => ({ ...prev, encounterType: e.target.value }))}
          className="p-2 border rounded"
        >
          <option value="">Tipo de Encuentro</option>
          <option value="Valoración Inicial">Valoración Inicial</option>
          <option value="Seguimiento">Seguimiento</option>
          <option value="Interconsulta">Interconsulta</option>
          <option value="Egreso">Egreso</option>
        </select>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-sm font-medium">Paciente</label>
          <input
            type="text"
            placeholder="Nombre del Paciente"
            value={note.patientName}
            onChange={(e) => setNote(prev => ({ ...prev, patientName: e.target.value }))}
            className="w-full p-2 border rounded mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium">Motivo de la Consulta / Padecimiento Actual</label>
          <textarea
            value={note.consultReason}
            onChange={(e) => setNote(prev => ({ ...prev, consultReason: e.target.value }))}
            className="w-full p-2 border rounded mt-1 h-24"
            placeholder="Describa el motivo principal de la consulta y la sintomatología actual..."
          />
        </div>
      </div>
    </div>
  )
}

export default MedicalNoteHeader


import React from "react"
import { Label } from "@/components/ui/label"

function RecordPersonalDataForm({ values, onChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre Completo</Label>
        <input
          id="fullName"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.fullName || ""}
          onChange={(e) => onChange({ ...values, fullName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Edad</Label>
        <input
          id="age"
          type="number"
          min="0"
          max="120"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.age || ""}
          onChange={(e) => onChange({ ...values, age: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sexo</Label>
        <select
          id="sex"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.sex || ""}
          onChange={(e) => onChange({ ...values, sex: e.target.value })}
        >
          <option value="">Selecciona una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
        <input
          id="birthDate"
          type="date"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.birthDate || ""}
          onChange={(e) => onChange({ ...values, birthDate: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthPlace">Lugar de Nacimiento</Label>
        <input
          id="birthPlace"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.birthPlace || ""}
          onChange={(e) => onChange({ ...values, birthPlace: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Nacionalidad</Label>
        <input
          id="nationality"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          defaultValue="Mexicano"
          value={values?.nationality || "Mexicano"}
          onChange={(e) => onChange({ ...values, nationality: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maritalStatus">Estado Civil</Label>
        <select
          id="maritalStatus"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.maritalStatus || ""}
          onChange={(e) => onChange({ ...values, maritalStatus: e.target.value })}
        >
          <option value="">Selecciona una opción</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
          <option value="Unión Libre">Unión Libre</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Ocupación</Label>
        <input
          id="occupation"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.occupation || ""}
          onChange={(e) => onChange({ ...values, occupation: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Escolaridad</Label>
        <select
          id="education"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.education || ""}
          onChange={(e) => onChange({ ...values, education: e.target.value })}
        >
          <option value="">Selecciona una opción</option>
          <option value="Ninguna">Ninguna</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Preparatoria">Preparatoria</option>
          <option value="Licenciatura">Licenciatura</option>
          <option value="Posgrado">Posgrado</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="religion">Religión</Label>
        <input
          id="religion"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.religion || ""}
          onChange={(e) => onChange({ ...values, religion: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentResidence">Lugar de Residencia Actual</Label>
        <input
          id="currentResidence"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          value={values?.currentResidence || ""}
          onChange={(e) => onChange({ ...values, currentResidence: e.target.value })}
        />
      </div>
    </div>
  )
}

export default RecordPersonalDataForm

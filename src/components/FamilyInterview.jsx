
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"

function FamilyInterview() {
  const { toast } = useToast()
  const [currentSection, setCurrentSection] = useState("intro")
  const [familyProfile, setFamilyProfile] = useState({
    interviewer: {
      name: "",
      age: "",
      gender: "",
      education: "",
      occupation: "",
      relation: ""
    },
    familyMembers: [],
    consumer: {
      age: "",
      gender: "",
      education: "",
      occupation: ""
    },
    householdMembers: ""
  })
  const [dynamics, setDynamics] = useState({
    roles: "",
    conflicts: "",
    unity: "",
    memberStyles: {},
    relationships: {}
  })
  const [impact, setImpact] = useState({
    support: "",
    memberImpact: {},
    emotions: {}
  })
  const [economicImpact, setEconomicImpact] = useState({
    substance: {
      main: "",
      frequency: "",
      cost: "",
      timesPerPeriod: ""
    },
    treatment: {
      therapyCost: "",
      medicationCost: "",
      hospitalizationCost: ""
    },
    incomeLoss: {
      lostDays: "",
      dailyIncome: "",
      lostOpportunities: ""
    },
    legal: {
      fines: "",
      lawyers: "",
      bail: ""
    },
    other: {
      propertyDamage: "",
      stolenItems: "",
      otherCosts: ""
    }
  })
  const [factors, setFactors] = useState({
    strengths: [],
    expectations: "",
    willingness: "",
    obstacles: "",
    familyHistory: "",
    stressfulEvents: "",
    triggers: ""
  })

  const educationLevels = [
    "Sin estudios",
    "Primaria",
    "Secundaria",
    "Bachillerato/Preparatoria",
    "Técnico",
    "Licenciatura/Grado",
    "Posgrado"
  ]

  const relations = [
    "Padre",
    "Madre",
    "Hermano/a",
    "Hijo/a",
    "Cónyuge/Pareja",
    "Abuelo/a",
    "Tío/a",
    "Amigo/a cercano",
    "Otro"
  ]

  const familyStrengths = [
    "Comunicación abierta",
    "Apoyo mutuo entre miembros",
    "Roles familiares claros y funcionales",
    "Capacidad de adaptación a cambios",
    "Red de apoyo externa",
    "Recursos económicos estables",
    "Valores compartidos",
    "Fe / Espiritualidad compartida"
  ]

  const communicationStyles = [
    "Pasivo (evita expresar necesidades/opiniones)",
    "Agresivo (impone opiniones, no respeta a otros)",
    "Pasivo-Agresivo (expresa hostilidad indirectamente)",
    "Asertivo (expresa necesidades/opiniones respetuosamente)"
  ]

  const relationshipTypes = [
    "Muy Unida",
    "Unida",
    "Distante",
    "Conflictiva"
  ]

  const emotions = [
    "Miedo",
    "Tristeza",
    "Ira / Enojo",
    "Culpa",
    "Estrés",
    "Ansiedad",
    "Frustración",
    "Impotencia",
    "Esperanza"
  ]

  const addFamilyMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      age: "",
      gender: "",
      education: "",
      occupation: "",
      relation: ""
    }
    setFamilyProfile(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, newMember]
    }))
  }

  const removeFamilyMember = (id) => {
    setFamilyProfile(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(member => member.id !== id)
    }))
  }

  const calculateEconomicImpact = () => {
    const substanceCost = 
      (parseFloat(economicImpact.substance.cost) || 0) * 
      (parseFloat(economicImpact.substance.timesPerPeriod) || 0) * 
      (economicImpact.substance.frequency === "weekly" ? 52 : 12)

    const treatmentCost = 
      (parseFloat(economicImpact.treatment.therapyCost) || 0) +
      (parseFloat(economicImpact.treatment.medicationCost) || 0) * 12 +
      (parseFloat(economicImpact.treatment.hospitalizationCost) || 0)

    const incomeLoss =
      (parseFloat(economicImpact.incomeLoss.lostDays) || 0) *
      (parseFloat(economicImpact.incomeLoss.dailyIncome) || 0) +
      (parseFloat(economicImpact.incomeLoss.lostOpportunities) || 0)

    const legalCosts =
      (parseFloat(economicImpact.legal.fines) || 0) +
      (parseFloat(economicImpact.legal.lawyers) || 0) +
      (parseFloat(economicImpact.legal.bail) || 0)

    const otherCosts =
      (parseFloat(economicImpact.other.propertyDamage) || 0) +
      (parseFloat(economicImpact.other.stolenItems) || 0) +
      (parseFloat(economicImpact.other.otherCosts) || 0)

    return {
      substanceCost,
      treatmentCost,
      incomeLoss,
      legalCosts,
      otherCosts,
      total: substanceCost + treatmentCost + incomeLoss + legalCosts + otherCosts
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case "intro":
        return (
          <div className="space-y-4">
            <p>
              Esta sección nos ayuda a entender mejor la dinámica de tu familia y cómo el consumo de sustancias puede estar afectándola. 
              La información que proporciones aquí es muy valiosa para que tu terapeuta pueda ofrecer un apoyo más personalizado a ti y a tu familia. 
              Por favor, responde a las siguientes secciones con la mayor sinceridad y detalle posible. Tu información es confidencial.
            </p>
            <Button onClick={() => setCurrentSection("profile")} className="w-full">
              Comenzar
            </Button>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Perfil Familiar</h3>
            
            {/* Datos del Entrevistado */}
            <div className="space-y-4">
              <h4 className="font-medium">Datos del Entrevistado</h4>
              <input
                type="text"
                placeholder="Nombre completo"
                value={familyProfile.interviewer.name}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, name: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Edad"
                value={familyProfile.interviewer.age}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, age: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <select
                value={familyProfile.interviewer.gender}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, gender: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
              <select
                value={familyProfile.interviewer.education}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, education: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona nivel educativo</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Ocupación actual"
                value={familyProfile.interviewer.occupation}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, occupation: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <select
                value={familyProfile.interviewer.relation}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  interviewer: { ...prev.interviewer, relation: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Relación con la persona consumidora</option>
                {relations.map(relation => (
                  <option key={relation} value={relation}>{relation}</option>
                ))}
              </select>
            </div>

            {/* Otros Miembros de la Familia */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Otros Miembros de la Familia</h4>
                <Button onClick={addFamilyMember} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Miembro
                </Button>
              </div>
              
              {familyProfile.familyMembers.map((member, index) => (
                <div key={member.id} className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Miembro Familiar {index + 1}</h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFamilyMember(member.id)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...familyProfile.familyMembers]
                      updated[index].name = e.target.value
                      setFamilyProfile(prev => ({
                        ...prev,
                        familyMembers: updated
                      }))
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Edad"
                      value={member.age}
                      onChange={(e) => {
                        const updated = [...familyProfile.familyMembers]
                        updated[index].age = e.target.value
                        setFamilyProfile(prev => ({
                          ...prev,
                          familyMembers: updated
                        }))
                      }}
                      className="p-2 border rounded"
                    />
                    <select
                      value={member.gender}
                      onChange={(e) => {
                        const updated = [...familyProfile.familyMembers]
                        updated[index].gender = e.target.value
                        setFamilyProfile(prev => ({
                          ...prev,
                          familyMembers: updated
                        }))
                      }}
                      className="p-2 border rounded"
                    >
                      <option value="">Género</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <select
                    value={member.education}
                    onChange={(e) => {
                      const updated = [...familyProfile.familyMembers]
                      updated[index].education = e.target.value
                      setFamilyProfile(prev => ({
                        ...prev,
                        familyMembers: updated
                      }))
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Nivel educativo</option>
                    {educationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Ocupación"
                    value={member.occupation}
                    onChange={(e) => {
                      const updated = [...familyProfile.familyMembers]
                      updated[index].occupation = e.target.value
                      setFamilyProfile(prev => ({
                        ...prev,
                        familyMembers: updated
                      }))
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    value={member.relation}
                    onChange={(e) => {
                      const updated = [...familyProfile.familyMembers]
                      updated[index].relation = e.target.value
                      setFamilyProfile(prev => ({
                        ...prev,
                        familyMembers: updated
                      }))
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Relación con la persona consumidora</option>
                    {relations.map(relation => (
                      <option key={relation} value={relation}>{relation}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Datos de la Persona Consumidora */}
            <div className="space-y-4">
              <h4 className="font-medium">Datos de la Persona Consumidora</h4>
              <input
                type="number"
                placeholder="Edad"
                value={familyProfile.consumer.age}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  consumer: { ...prev.consumer, age: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <select
                value={familyProfile.consumer.gender}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  consumer: { ...prev.consumer, gender: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
              <select
                value={familyProfile.consumer.education}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  consumer: { ...prev.consumer, education: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Nivel educativo</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Ocupación"
                value={familyProfile.consumer.occupation}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  consumer: { ...prev.consumer, occupation: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Hogar */}
            <div className="space-y-4">
              <h4 className="font-medium">Hogar</h4>
              <input
                type="number"
                placeholder="Número total de personas que viven en el hogar"
                value={familyProfile.householdMembers}
                onChange={(e) => setFamilyProfile(prev => ({
                  ...prev,
                  householdMembers: e.target.value
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <Button 
              onClick={() => setCurrentSection("dynamics")}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )

      case "dynamics":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Dinámica y Comunicación Familiar</h3>
            
            {/* Dinámicas Generales */}
            <div className="space-y-4">
              <h4 className="font-medium">Dinámicas Generales</h4>
              <textarea
                placeholder="Describe los roles principales dentro de la familia..."
                value={dynamics.roles}
                onChange={(e) => setDynamics(prev => ({
                  ...prev,
                  roles: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="Describe cómo se resuelven generalmente los conflictos en la familia..."
                value={dynamics.conflicts}
                onChange={(e) => setDynamics(prev => ({
                  ...prev,
                  conflicts: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="Describe qué tan unida sientes que es la familia..."
                value={dynamics.unity}
                onChange={(e) => setDynamics(prev => ({
                  ...prev,
                  unity: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            {/* Características Individuales */}
            <div className="space-y-4">
              <h4 className="font-medium">Características Individuales</h4>
              {[...familyProfile.familyMembers, familyProfile.interviewer].map((member, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg space-y-4">
                  <h5 className="font-medium">{member.name || "Entrevistado"}</h5>
                  
                  {/* Estilo de Comunicación */}
                  <div>
                    <p className="mb-2">Estilo de comunicación predominante:</p>
                    {communicationStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name={`communication-${index}`}
                          value={style}
                          checked={dynamics.memberStyles[index] === style}
                          onChange={(e) => setDynamics(prev => ({
                            ...prev,
                            memberStyles: {
                              ...prev.memberStyles,
                              [index]: e.target.value
                            }
                          }))}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>

                  {/* Tipo de Relación */}
                  <div>
                    <p className="mb-2">Relación con la persona consumidora:</p>
                    {relationshipTypes.map(type => (
                      <label key={type} className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name={`relationship-${index}`}
                          value={type}
                          checked={dynamics.relationships[index]?.type === type}
                          onChange={(e) => setDynamics(prev => ({
                            ...prev,
                            relationships: {
                              ...prev.relationships,
                              [index]: {
                                ...prev.relationships[index],
                                type: e.target.value
                              }
                            }
                          }))}
                          className="rounded"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                    <textarea
                      placeholder="Describe brevemente por qué consideras que la relación es así..."
                      value={dynamics.relationships[index]?.description || ""}
                      onChange={(e) => setDynamics(prev => ({
                        ...prev,
                        relationships: {
                          ...prev.relationships,
                          [index]: {
                            ...prev.relationships[index],
                            description: e.target.value
                          }
                        }
                      }))}
                      className="w-full p-2 border rounded mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => setCurrentSection("impact")}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )

      case "impact":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Impacto Emocional y Relacional</h3>
            
            {/* Recursos de Apoyo */}
            <div className="space-y-4">
              <h4 className="font-medium">Recursos de Apoyo</h4>
              <textarea
                placeholder="Describe quiénes brindan apoyo a la familia..."
                value={impact.support}
                onChange={(e) => setImpact(prev => ({
                  ...prev,
                  support: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            {/* Impacto Individual */}
            <div className="space-y-4">
              <h4 className="font-medium">Impacto Individual</h4>
              {[...familyProfile.familyMembers, familyProfile.interviewer].map((member, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg space-y-4">
                  <h5 className="font-medium">{member.name || "Entrevistado"}</h5>
                  
                  {/* Impacto en la Relación */}
                  <div>
                    <p className="mb-2">Impacto del consumo en la relación:</p>
                    {["Mucho", "Moderadamente", "Poco", "Nada / No aplica"].map(level => (
                      <label key={level} className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name={`impact-${index}`}
                          value={level}
                          checked={impact.memberImpact[index]?.level === level}
                          onChange={(e) => setImpact(prev => ({
                            ...prev,
                            memberImpact: {
                              ...prev.memberImpact,
                              [index]: {
                                ...prev.memberImpact[index],
                                level: e.target.value
                              }
                            }
                          }))}
                          className="rounded"
                        />
                        <span>{level}</span>
                      </label>
                    ))}
                    <textarea
                      placeholder="Describe los cambios específicos en la relación..."
                      value={impact.memberImpact[index]?.description || ""}
                      onChange={(e) => setImpact(prev => ({
                        ...prev,
                        memberImpact: {
                          ...prev.memberImpact,
                          [index]: {
                            ...prev.memberImpact[index],
                            description: e.target.value
                          }
                        }
                      }))}
                      className="w-full p-2 border rounded mt-2"
                    />
                  </div>

                  {/* Emociones */}
                  <div>
                    <p className="mb-2">Emociones experimentadas:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {emotions.map(emotion => (
                        <label key={emotion} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={impact.emotions[index]?.includes(emotion)}
                            onChange={(e) => {
                              const currentEmotions = impact.emotions[index] || []
                              setImpact(prev => ({
                                ...prev,
                                emotions: {
                                  ...prev.emotions,
                                  [index]: e.target.checked
                                    ? [...currentEmotions, emotion]
                                    : currentEmotions.filter(e => e !== emotion)
                                }
                              }))
                            }}
                            className="rounded"
                          />
                          <span>{emotion}</span>
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Otras emociones..."
                      value={impact.emotions[index]?.other || ""}
                      onChange={(e) => setImpact(prev => ({
                        ...prev,
                        emotions: {
                          ...prev.emotions,
                          [index]: {
                            ...prev.emotions[index],
                            other: e.target.value
                          }
                        }
                      }))}
                      className="w-full p-2 border rounded mt-2"
                    />
                    <textarea
                      placeholder="Describe cómo se manifiestan estas emociones..."
                      value={impact.emotions[index]?.manifestation || ""}
                      onChange={(e) => setImpact(prev => ({
                        ...prev,
                        emotions: {
                          ...prev.emotions,
                          [index]: {
                            ...prev.emotions[index],
                            manifestation: e.target.value
                          }
                        }
                      }))}
                      className="w-full p-2 border rounded mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => setCurrentSection("economic")}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )

      case "economic":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Impacto Económico</h3>
            
            {/* Gasto en Sustancias */}
            <div className="space-y-4">
              <h4 className="font-medium">Gasto en Sustancias</h4>
              <input
                type="text"
                placeholder="Sustancia principal"
                value={economicImpact.substance.main}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  substance: { ...prev.substance, main: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <select
                value={economicImpact.substance.frequency}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  substance: { ...prev.substance, frequency: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona frecuencia</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
              <input
                type="number"
                placeholder="Gasto promedio por ocasión"
                value={economicImpact.substance.cost}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  substance: { ...prev.substance, cost: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Veces por periodo"
                value={economicImpact.substance.timesPerPeriod}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  substance: { ...prev.substance, timesPerPeriod: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Gastos de Tratamiento */}
            <div className="space-y-4">
              <h4 className="font-medium">Gastos de Tratamiento</h4>
              <input
                type="number"
                placeholder="Costo total de tratamientos/terapias (último año)"
                value={economicImpact.treatment.therapyCost}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  treatment: { ...prev.treatment, therapyCost: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Costo mensual de medicamentos"
                value={economicImpact.treatment.medicationCost}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  treatment: { ...prev.treatment, medicationCost: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Costo total de hospitalizaciones (último año)"
                value={economicImpact.treatment.hospitalizationCost}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  treatment: { ...prev.treatment, hospitalizationCost: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>{/* Pérdida de Ingresos */}
            <div className="space-y-4">
              <h4 className="font-medium">Pérdida de Ingresos</h4>
              <input
                type="number"
                placeholder="Días de trabajo perdidos (último año)"
                value={economicImpact.incomeLoss.lostDays}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  incomeLoss: { ...prev.incomeLoss, lostDays: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Ingreso diario promedio"
                value={economicImpact.incomeLoss.dailyIncome}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  incomeLoss: { ...prev.incomeLoss, dailyIncome: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Valor estimado de oportunidades perdidas"
                value={economicImpact.incomeLoss.lostOpportunities}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  incomeLoss: { ...prev.incomeLoss, lostOpportunities: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Gastos Legales */}
            <div className="space-y-4">
              <h4 className="font-medium">Gastos Legales</h4>
              <input
                type="number"
                placeholder="Costo total de multas/sanciones"
                value={economicImpact.legal.fines}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  legal: { ...prev.legal, fines: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Costo total de honorarios legales"
                value={economicImpact.legal.lawyers}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  legal: { ...prev.legal, lawyers: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Costo total de fianzas/indemnizaciones"
                value={economicImpact.legal.bail}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  legal: { ...prev.legal, bail: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Otros Gastos */}
            <div className="space-y-4">
              <h4 className="font-medium">Otros Gastos</h4>
              <input
                type="number"
                placeholder="Costo de daños a propiedad/vehículos"
                value={economicImpact.other.propertyDamage}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  other: { ...prev.other, propertyDamage: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Valor de objetos robados/perdidos"
                value={economicImpact.other.stolenItems}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  other: { ...prev.other, stolenItems: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Otros gastos significativos"
                value={economicImpact.other.otherCosts}
                onChange={(e) => setEconomicImpact(prev => ({
                  ...prev,
                  other: { ...prev.other, otherCosts: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Resumen del Impacto Económico */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-medium">Resumen del Impacto Económico Anual</h4>
              {Object.entries(calculateEconomicImpact()).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium">${value.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => setCurrentSection("factors")}
              className="w-full"
            >
              Siguiente
            </Button>
          </div>
        )

      case "factors":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Factores de Influencia, Riesgo y Protección</h3>
            
            {/* Fortalezas y Recursos */}
            <div className="space-y-4">
              <h4 className="font-medium">Fortalezas y Recursos Familiares</h4>
              <div className="grid grid-cols-2 gap-2">
                {familyStrengths.map(strength => (
                  <label key={strength} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={factors.strengths.includes(strength)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFactors(prev => ({
                            ...prev,
                            strengths: [...prev.strengths, strength]
                          }))
                        } else {
                          setFactors(prev => ({
                            ...prev,
                            strengths: prev.strengths.filter(s => s !== strength)
                          }))
                        }
                      }}
                      className="rounded"
                    />
                    <span>{strength}</span>
                  </label>
                ))}
              </div>
              <textarea
                placeholder="Describe con ejemplos cómo se manifiestan estas fortalezas..."
                value={factors.strengthsDescription}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  strengthsDescription: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            {/* Disposición y Obstáculos */}
            <div className="space-y-4">
              <h4 className="font-medium">Disposición y Obstáculos</h4>
              <textarea
                placeholder="¿Qué expectativas tiene la familia sobre el tratamiento?"
                value={factors.expectations}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  expectations: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="¿Qué están dispuestos a hacer los miembros de la familia?"
                value={factors.willingness}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  willingness: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="¿Qué posibles obstáculos o dificultades prevén?"
                value={factors.obstacles}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  obstacles: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            {/* Contexto e Historial */}
            <div className="space-y-4">
              <h4 className="font-medium">Contexto e Historial</h4>
              <textarea
                placeholder="Describe si otros miembros de la familia han tenido problemas con el consumo..."
                value={factors.familyHistory}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  familyHistory: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="Describe eventos vitales importantes o estresantes..."
                value={factors.stressfulEvents}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  stressfulEvents: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                placeholder="¿Qué eventos o factores pudieron haber desencadenado el consumo?"
                value={factors.triggers}
                onChange={(e) => setFactors(prev => ({
                  ...prev,
                  triggers: e.target.value
                }))}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            <Button 
              onClick={() => {
                toast({
                  title: "Entrevista completada",
                  description: "La información ha sido guardada exitosamente",
                })
                setCurrentSection("intro")
              }}
              className="w-full"
            >
              Finalizar Entrevista
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  )
}

export default FamilyInterview

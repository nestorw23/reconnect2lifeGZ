
export const ItemsPPF = [
  // Subescala 1: Consumo de alcohol y drogas en los últimos 30 días (11 ítems)
  { itemNumber: 1, itemText: "En mi hogar, se ha consumido alcohol con frecuencia en los últimos 30 días.", subscaleId: 1, subscaleName: "Consumo de alcohol y drogas en los últimos 30 días" },
  // ... (Los primeros 38 ítems que ya estaban)

  // Subescala 8: Depresión de los padres y autoestima (11 ítems)
  { itemNumber: 39, itemText: "Con frecuencia me siento triste o desesperanzado(a).", subscaleId: 8, subscaleName: "Depresión de los padres y autoestima" },
  { itemNumber: 40, itemText: "He perdido interés en actividades diarias que solía disfrutar.", subscaleId: 8, subscaleName: "Depresión de los padres y autoestima" },
  // ... (Continuar con todos los ítems hasta el 132)
]

export const SubscaleInterpretationsRecommendations = [
  { 
    subscaleId: 1, 
    name: "Consumo de alcohol y drogas en los últimos 30 días", 
    riskFactor: "Presencia frecuente o reciente de consumo de sustancias en el hogar, incluyendo episodios de consumo elevado o riesgoso.", 
    recommendations: "Explorar la necesidad de buscar apoyo o tratamiento profesional para los miembros que consumen; fomentar un ambiente hogareño con normas claras sobre el no consumo o consumo responsable; modelar comportamientos saludables." 
  },
  // ... (Continuar con todas las interpretaciones)
]


import React from "react"
import { motion } from "framer-motion"
import { Calendar, Video, PlayCircle } from "lucide-react"

function Sessions() {
  return (
    <div className="container p-4 space-y-6">
      <h1 className="text-2xl font-bold">Sesiones de Terapia</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Sección Sesión Programada */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Próxima Sesión</h2>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dra. Sara Jiménez</p>
                <p className="text-sm text-muted-foreground">
                  Jueves, 14:00
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                Unirse
              </button>
            </div>
          </div>
        </div>

        {/* Sección Video */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Video className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Sala de Video</h2>
          </div>
          <div className="mt-4 aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">La sesión de video aparecerá aquí</p>
          </div>
        </div>

        {/* Sección Lista de Videos */}
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <PlayCircle className="w-6 h-6 text-primary" />
            <h2 className="font-semibold">Biblioteca de Recursos</h2>
          </div>
          <div className="mt-4 space-y-4">
            {[
              "Entendiendo la Adicción",
              "Estrategias de Afrontamiento",
              "Técnicas de Mindfulness",
              "Guía de Apoyo Familiar",
            ].map((video) => (
              <div
                key={video}
                className="flex items-center space-x-3 p-2 hover:bg-accent rounded-md cursor-pointer"
              >
                <PlayCircle className="w-5 h-5" />
                <span>{video}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Sessions

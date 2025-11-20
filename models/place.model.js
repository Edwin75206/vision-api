import mongoose from "mongoose";

const esquemaLugarTuristico = new mongoose.Schema(
  {
    // Nombre del lugar turístico (ej. "Mirador de Xicotepec")
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    // Descripción del lugar (qué es, qué se hace ahí, etc.)
    descripcion: {
      type: String,
      required: true,
    },

    // Ubicación geográfica (opcional) para mapas
    ubicacion: {
      latitud: {
        type: Number,
      },
      longitud: {
        type: Number,
      },
    },

    // URL de una imagen representativa del lugar
    urlImagen: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Modelo: LugarTuristico
// Colección: "lugarturisticos"
export const LugarTuristico = mongoose.model(
  "LugarTuristico",
  esquemaLugarTuristico
);

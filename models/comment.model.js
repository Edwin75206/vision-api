import mongoose from "mongoose";

const esquemaComentario = new mongoose.Schema(
  {
    // Referencia al lugar turístico comentado
    lugar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LugarTuristico",
      required: true,
    },

    // Referencia opcional al usuario (si está logueado)
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },

    // Nombre que se muestra como autor si no hay usuario logueado
    // (ej. "Visitante", "Anónimo", "Edwin")
    nombreAutor: {
      type: String,
    },

    // Contenido del comentario
    texto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Modelo: Comentario
// Colección: "comentarios"
export const Comentario = mongoose.model("Comentario", esquemaComentario);

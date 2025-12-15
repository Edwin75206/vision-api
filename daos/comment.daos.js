import { connectDB } from "../database.js"; // o "../config/db.js" según tu proyecto
import { Comentario } from "../models/comment.model.js";

export const comentarioDao = {
  async obtenerPorLugar(idLugar) {
    await connectDB();
    return Comentario.find({ lugar: idLugar })
      .sort({ createdAt: -1 })
      .populate("usuario", "nombre rol");
  },

  async crear(datosComentario) {
    await connectDB();
    return Comentario.create(datosComentario);
  },

  async obtenerPorId(id) {
    await connectDB();
    return Comentario.findById(id).populate("usuario", "nombre rol");
  },

  async actualizarTexto(id, texto) {
    await connectDB();
    return Comentario.findByIdAndUpdate(id, { texto }, { new: true })
      .populate("usuario", "nombre rol");
  },

  async eliminar(id) {
    await connectDB();
    return Comentario.findByIdAndDelete(id);
  },
};

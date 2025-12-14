import { Comentario } from "../models/comment.model.js";

export const comentarioDao = {
  obtenerPorLugar(idLugar) {
    return Comentario.find({ lugar: idLugar })
      .sort({ createdAt: -1 })
      .populate("usuario", "nombre rol");
  },

  crear(datosComentario) {
    return Comentario.create(datosComentario);
  },
  obtenerPorId(id) {
    return Comentario.findById(id).populate("usuario", "nombre rol");
  },

  // ✅ NUEVO
  actualizarTexto(id, texto) {
    return Comentario.findByIdAndUpdate(
      id,
      { texto },
      { new: true }
    ).populate("usuario", "nombre rol");
  },

  // ✅ NUEVO
  eliminar(id) {
    return Comentario.findByIdAndDelete(id);
  },
};

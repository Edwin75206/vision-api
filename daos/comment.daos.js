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
};

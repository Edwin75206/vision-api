import { connectDB } from "../database.js"; // o ../config/db.js según tu proyecto
import { Comentario } from "../models/comment.model.js";

export const comentarioDao = {
  async crear(data) {
    await connectDB();
    return Comentario.create(data);
  },

  async actualizar(filtro, data) {
    await connectDB();
    return Comentario.findOneAndUpdate(filtro, data, { new: true });
  },

  async obtenerPorId(id) {
    await connectDB();
    return Comentario.findById(id);
  },

  async eliminar(filtro) {
    await connectDB();
    return Comentario.findOneAndDelete(filtro);
  },

  async listarPorLugar(lugarId) {
    await connectDB();
    return Comentario.find({ lugarId }).sort({ createdAt: -1 });
  },
};

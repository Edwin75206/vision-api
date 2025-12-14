import { Usuario } from "../models/user.model.js";
import { connectDB } from "../database.js"; // o "../config/db.js" según tu proyecto

export const usuarioDao = {
  async crearUsuario(datosUsuario) {
    await connectDB();
    return Usuario.create(datosUsuario);
  },

  async buscarPorCorreo(correo) {
    await connectDB();
    return Usuario.findOne({ correo });
  },

  async buscarPorId(idUsuario) {
    await connectDB();
    return Usuario.findById(idUsuario);
  },
};

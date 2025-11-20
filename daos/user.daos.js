import { Usuario } from "../models/user.model.js";

export const usuarioDao = {
  crearUsuario(datosUsuario) {
    return Usuario.create(datosUsuario);
  },

  buscarPorCorreo(correo) {
    return Usuario.findOne({ correo });
  },

  buscarPorId(idUsuario) {
    return Usuario.findById(idUsuario);
  },
};

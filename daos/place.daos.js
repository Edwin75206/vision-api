
import { LugarTuristico } from "../models/place.model.js";

export const lugarDao = {
  obtenerTodos() {
    return LugarTuristico.find().sort({ createdAt: -1 });
  },

  crear(datosLugar) {
    return LugarTuristico.create(datosLugar);
  },

  actualizar(idLugar, datosLugar) {
    return LugarTuristico.findByIdAndUpdate(idLugar, datosLugar, {
      new: true,
    });
  },

  eliminar(idLugar) {
    return LugarTuristico.findByIdAndDelete(idLugar);
  },

  buscarPorId(idLugar) {
    return LugarTuristico.findById(idLugar);
  },
};

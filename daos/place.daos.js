import { connectDB } from "../database.js";
import { LugarTuristico } from "../models/place.model.js";

export const lugarDao = {
  async obtenerTodos() {
    await connectDB();
    return LugarTuristico.find().sort({ createdAt: -1 });
  },

  async crear(datosLugar) {
    await connectDB();
    return LugarTuristico.create(datosLugar);
  },

  async actualizar(idLugar, datosLugar) {
    await connectDB();
    return LugarTuristico.findByIdAndUpdate(idLugar, datosLugar, { new: true });
  },

  async eliminar(idLugar) {
    await connectDB();
    return LugarTuristico.findByIdAndDelete(idLugar);
  },

  async buscarPorId(idLugar) {
    await connectDB();
    return LugarTuristico.findById(idLugar);
  },
};

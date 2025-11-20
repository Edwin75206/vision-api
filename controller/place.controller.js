import { lugarDao } from "../daos/place.daos.js";

export const lugarControlador = {
  obtenerTodos: async (req, res) => {
    try {
      const lugares = await lugarDao.obtenerTodos();
      res.json(lugares);
    } catch (err) {
      console.error("Error en obtenerTodos lugares:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre, descripcion, ubicacion, urlImagen } = req.body;

      if (!nombre || !descripcion) {
        return res
          .status(400)
          .json({ mensaje: "nombre y descripcion son obligatorios" });
      }

      const lugar = await lugarDao.crear({
        nombre,
        descripcion,
        ubicacion,
        urlImagen,
      });

      res.status(201).json(lugar);
    } catch (err) {
      console.error("Error en crear lugar:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  actualizar: async (req, res) => {
    try {
      const lugar = await lugarDao.actualizar(req.params.id, req.body);
      if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
      }
      res.json(lugar);
    } catch (err) {
      console.error("Error en actualizar lugar:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  eliminar: async (req, res) => {
    try {
      const lugar = await lugarDao.eliminar(req.params.id);
      if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
      }
      res.json({ mensaje: "Lugar eliminado" });
    } catch (err) {
      console.error("Error en eliminar lugar:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },
};

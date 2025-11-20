import { comentarioDao } from "../daos/comment.daos.js";
import { lugarDao } from "../daos/place.daos.js";

export const comentarioControlador = {
  obtenerPorLugar: async (req, res) => {
    try {
      const { idLugar } = req.params;
      const comentarios = await comentarioDao.obtenerPorLugar(idLugar);
      res.json(comentarios);
    } catch (err) {
      console.error("Error en obtenerPorLugar comentarios:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  crearPublico: async (req, res) => {
    try {
      const { idLugar, texto, nombreAutor } = req.body;

      if (!idLugar || !texto) {
        return res
          .status(400)
          .json({ mensaje: "idLugar y texto son obligatorios" });
      }

      const lugar = await lugarDao.buscarPorId(idLugar);
      if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
      }

      const comentario = await comentarioDao.crear({
        lugar: idLugar,
        texto,
        nombreAutor,
      });

      res.status(201).json(comentario);
    } catch (err) {
      console.error("Error en crearPublico comentario:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  crearComoUsuario: async (req, res) => {
    try {
      const { idLugar, texto } = req.body;

      if (!idLugar || !texto) {
        return res
          .status(400)
          .json({ mensaje: "idLugar y texto son obligatorios" });
      }

      const lugar = await lugarDao.buscarPorId(idLugar);
      if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
      }

      const comentario = await comentarioDao.crear({
        lugar: idLugar,
        texto,
        usuario: req.usuario.id,
      });

      res.status(201).json(comentario);
    } catch (err) {
      console.error("Error en crearComoUsuario comentario:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },
};

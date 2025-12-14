import { comentarioDao } from "../daos/comment.daos.js";
import { lugarDao } from "../daos/place.daos.js";


function puedeModificar({ reqUsuario, comentario }) {
  if (!reqUsuario) return false;
  if (reqUsuario.rol === "admin") return true;

  // si el comentario es público (sin usuario), solo admin
  if (!comentario.usuario) return false;

  return String(comentario.usuario._id || comentario.usuario) === String(reqUsuario.id);
}

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
  }, actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { texto } = req.body;

      if (!texto || !String(texto).trim()) {
        return res.status(400).json({ mensaje: "texto es obligatorio" });
      }

      const comentario = await comentarioDao.obtenerPorId(id);
      if (!comentario) return res.status(404).json({ mensaje: "Comentario no encontrado" });

      if (!puedeModificar({ reqUsuario: req.usuario, comentario })) {
        return res.status(403).json({ mensaje: "No tienes permiso para editar este comentario" });
      }

      const actualizado = await comentarioDao.actualizarTexto(id, String(texto).trim());
      return res.json(actualizado);
    } catch (err) {
      console.error("Error en actualizar comentario:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  // ✅ NUEVO: Eliminar
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;

      const comentario = await comentarioDao.obtenerPorId(id);
      if (!comentario) return res.status(404).json({ mensaje: "Comentario no encontrado" });

      if (!puedeModificar({ reqUsuario: req.usuario, comentario })) {
        return res.status(403).json({ mensaje: "No tienes permiso para eliminar este comentario" });
      }

      await comentarioDao.eliminar(id);
      return res.json({ ok: true, mensaje: "Comentario eliminado" });
    } catch (err) {
      console.error("Error en eliminar comentario:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usuarioDao } from "../daos/user.daos.js";

export const authControlador = {
  registrar: async (req, res) => {
    try {
      const { nombre, correo, contrasena } = req.body;

      if (!nombre || !correo || !contrasena) {
        return res.status(400).json({
          mensaje: "nombre, correo y contrasena son obligatorios",
        });
      }

      const existente = await usuarioDao.buscarPorCorreo(correo);
      if (existente) {
        return res
          .status(409)
          .json({ mensaje: "El correo ya está registrado" });
      }

      const contrasenaHash = await bcrypt.hash(contrasena, 10);

      const usuario = await usuarioDao.crearUsuario({
        nombre,
        correo,
        contrasenaHash,
        rol: "usuario",
      });

      res.status(201).json({
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      });
    } catch (err) {
      console.error("Error en registrar:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  iniciarSesion: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;

      const usuario = await usuarioDao.buscarPorCorreo(correo);
      if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      }

      const coincide = await bcrypt.compare(
        contrasena,
        usuario.contrasenaHash
      );
      if (!coincide) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          rol: usuario.rol,
        },
      });
    } catch (err) {
      console.error("Error en iniciarSesion:", err);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },
};

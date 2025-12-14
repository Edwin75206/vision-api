import { Router } from "express";
import { comentarioControlador } from "../controller/comment.controller.js";
import { authRequerida } from "../middleware/Auth.js";

const router = Router();

// Comentarios de un lugar (público)
router.get("/lugar/:idLugar", comentarioControlador.obtenerPorLugar);

// Crear comentario sin login
router.post("/", comentarioControlador.crearPublico);

// Crear comentario con usuario logueado
router.post("/yo", authRequerida, comentarioControlador.crearComoUsuario);


router.put("/:id", authRequerida, comentarioControlador.actualizar);
router.delete("/:id", authRequerida, comentarioControlador.eliminar);

export default router;

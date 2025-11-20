import { Router } from "express";
import { lugarControlador } from "../controller/place.controller.js";
import { authRequerida, soloAdmin } from "../middleware/Auth.js";

const router = Router();

// Público
router.get("/", lugarControlador.obtenerTodos);

// Solo admin
router.post("/", authRequerida, soloAdmin, lugarControlador.crear);
router.put("/:id", authRequerida, soloAdmin, lugarControlador.actualizar);
router.delete("/:id", authRequerida, soloAdmin, lugarControlador.eliminar);

export default router;

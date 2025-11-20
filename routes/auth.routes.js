import { Router } from "express";
import { authControlador } from "../controller/auth.controller.js";

const router = Router();

router.post("/registrar", authControlador.registrar);
router.post("/login", authControlador.iniciarSesion);

export default router;

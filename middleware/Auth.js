import jwt from "jsonwebtoken";

export function authRequerida(req, res, next) {
  const encabezado = req.headers.authorization;

  if (!encabezado?.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = encabezado.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload: { id, rol }
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}

export function soloAdmin(req, res, next) {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "Solo administradores" });
  }
  next();
}

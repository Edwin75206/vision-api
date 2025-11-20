import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import placeRoutes from "./routes/places.routes.js";
import commentsRoutes from "./routes/comment.routes.js";

export const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/comments", commentsRoutes);

// Ping
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "Vision PWA backend up" });
});

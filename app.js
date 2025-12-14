import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import placeRoutes from "./routes/places.routes.js";
import commentsRoutes from "./routes/comment.routes.js";

const app = express(); // ✅ ya no "export const app"

// Middlewares globales
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    // "https://TU-FRONTEND.vercel.app"  // pon aquí tu prod cuando la tengas
  ],
  credentials: true
}));
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/comments", commentsRoutes);

// Ping
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "Vision PWA backend up" });
});

export default app; // ✅ ESTO arregla el "Invalid export"

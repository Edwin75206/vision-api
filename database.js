import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI no está definida");
  }

  // ✅ Si ya hay conexión, reutilízala
  if (cached.conn) return cached.conn;

  // ✅ Si ya hay un intento en progreso, reutilízalo
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false, // evita buffering eterno
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

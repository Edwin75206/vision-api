import mongoose from "mongoose";

const esquemaUsuario = new mongoose.Schema(
  {
    // Nombre visible del usuario (ej. "Edwin Castañeda")
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    // Correo electrónico de acceso / contacto
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Contraseña hasheada con bcrypt (nunca guardes la contraseña en texto plano)
    contrasenaHash: {
      type: String,
      required: true,
    },

    // Rol del usuario: puede ser "admin" o "usuario"
    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true, // Crea campos createdAt y updatedAt automáticamente
  }
);

// Nombre del modelo en el código: Usuario
// Nombre de la colección en Mongo: "usuarios" (pluralizado por Mongoose)
export const Usuario = mongoose.model("Usuario", esquemaUsuario);

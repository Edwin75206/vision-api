import "dotenv/config.js";
import app from "./app.js";
import { connectDB } from "./database.js";

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}

start();

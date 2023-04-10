import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enlacesRoutes from "./routes/enlacesRoutes.js";
import archivosRoutes from "./routes/archivosRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();

conectarDB();

const optCors = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(optCors));

console.log("comenzando...");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static("uploads"));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/enlaces", enlacesRoutes);
app.use("/api/archivos", archivosRoutes);

app.listen(port, () => {
  console.log(`El servidor este corriendo en el port: ${port}`);
});

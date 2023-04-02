import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();
console.log("comenzando...");
const port = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);

app.listen(port, () => {
  console.log(`El servidor este corriendo en el port: ${port}`);
});

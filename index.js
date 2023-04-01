import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

const app = express();
dotenv.config();

conectarDB();
console.log("comenzando...");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`El servidor este corriendo en el port: ${port}`);
});

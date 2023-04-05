import express from "express";
import { body } from "express-validator";
import auth from "../moddlerare/auth.js";
import { generarEnlace, getEnlaceArchivo } from "../controllers/enlacesController.js";
import { eliminarArchivo } from "../controllers/archivosController.js";

const router = express.Router();

router.post(
  "/",
  body("nombre", "Sube un archivo").not().isEmpty(),
  body("nombre_original", "Por favor,Sube un archivo").not().isEmpty(),
  auth,
  generarEnlace
);

router.get("/:url", getEnlaceArchivo, eliminarArchivo);
export default router;

import express from "express";
import { body } from "express-validator";
import auth from "../moddlerare/auth.js";
import { generarEnlace } from "../controllers/enlacesController.js";

const router = express.Router();

router.post(
  "/",
  body("nombre", "Sube un archivo").not().isEmpty(),
  body("nombre_original", "Por favor,Sube un archivo").not().isEmpty(),
  auth,
  generarEnlace
);

export default router;

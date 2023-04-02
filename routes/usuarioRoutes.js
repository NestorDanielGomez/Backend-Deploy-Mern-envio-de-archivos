import express from "express";
import { body, check, validationResult } from "express-validator";
import { crearUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

router.post(
  "/",
  body("nombre", "el Nombre es obligatorio").not().isEmpty(),
  body("email", "Ingresa un email valido").isEmail(),
  body("password", "El password debe tener como minimo 5 caracteres").isLength({ min: 5 }),
  crearUsuario
);

export default router;

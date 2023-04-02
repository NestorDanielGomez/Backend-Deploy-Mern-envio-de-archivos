import express from "express";
import { body, check, validationResult } from "express-validator";
import { autenticarUsuario, usuarioAutenticado } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/",
  body("email", "Ingresa un email valido").isEmail(),
  body("password", "El password no puede ir vacio").not().isEmpty(),
  autenticarUsuario
);
router.get("/", usuarioAutenticado);

export default router;

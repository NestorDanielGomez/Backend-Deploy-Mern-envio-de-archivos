import express from "express";
import { body } from "express-validator";
import auth from "../middlerare/auth.js";
import { subirArchivo, descargar } from "../controllers/archivosController.js";

const router = express.Router();
router.post("/", auth, subirArchivo);
router.get("/:archivo", descargar);

export default router;

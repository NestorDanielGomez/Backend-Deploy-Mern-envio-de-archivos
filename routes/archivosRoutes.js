import express from "express";
import { body } from "express-validator";
import auth from "../moddlerare/auth.js";
import { subirArchivo, eliminarArchivo } from "../controllers/archivosController.js";

const router = express.Router();

router.post("/", subirArchivo);
router.delete("/:id", eliminarArchivo);

export default router;

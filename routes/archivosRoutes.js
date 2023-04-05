import express from "express";
import { body } from "express-validator";
import auth from "../moddlerare/auth.js";
import { subirArchivo } from "../controllers/archivosController.js";

const router = express.Router();

router.post("/", auth, subirArchivo);

export default router;

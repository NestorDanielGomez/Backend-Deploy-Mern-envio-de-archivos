import Enlace from "../models/Enlace.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../uploads");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${shortid.generate()}.${extension}`);
  },
});

const configuracionMulter = {
  limits: { fileSize: 1000000 },
  storage: fileStorage,
};
const upload = multer(configuracionMulter).single("archivo");

const subirArchivo = async (req, res, next) => {
  upload(req, res, async (error) => {
    console.log(req.file);
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};
const eliminarArchivo = async (req, res, next) => {};

export { subirArchivo, eliminarArchivo };

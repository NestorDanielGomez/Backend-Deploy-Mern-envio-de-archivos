import Enlace from "../models/Enlace.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subirArchivo = async (req, res, next) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, `${shortid.generate()}${extension}`);
    },
  });

  const configuracionMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 20 : 1000000 },
    storage: fileStorage,
  };
  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

const eliminarArchivo = (req, res) => {
  console.log("req.archivo", req.archivo);
  try {
    const direccion = path.join(__dirname + `/../uploads/${req.archivo}`);
    fs.unlinkSync(direccion);
  } catch (error) {
    console.log(error);
  }
};

export { subirArchivo, eliminarArchivo };

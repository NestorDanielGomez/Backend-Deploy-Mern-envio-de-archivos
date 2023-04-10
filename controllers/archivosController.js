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
  try {
    const direccion = path.join(__dirname + `/../uploads/${req.archivo}`);
    fs.unlinkSync(direccion);
  } catch (error) {
    console.log(error);
  }
};

const descargar = async (req, res, next) => {
  const { archivo } = req.params;
  const enlace = await Enlace.findOne({ nombre: archivo });
  const archivoDescarga = path.join(__dirname + `/../uploads/${archivo}`);
  res.download(archivoDescarga);

  // Borrar archivo y entrada de la db
  // Si las descargas = 1 - Borro entrada y archivo
  const { descargas, nombre } = enlace;

  if (descargas === 1) {
    req.archivo = nombre;

    await Enlace.findOneAndRemove(enlace.id);
    next();
  } else {
    // si descargas > a 1 - solo usuario registrado
    enlace.descargas--;
    await enlace.save();
  }
};

export { subirArchivo, eliminarArchivo, descargar };

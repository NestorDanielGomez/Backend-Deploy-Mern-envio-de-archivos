import Enlace from "../models/Enlace.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import shortid from "shortid";

const generarEnlace = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(403).json({ errores: errores.array() });
  }

  const { nombre_original, nombre } = req.body;
  // console.log("nombre", nombre);
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;
  enlace.descargas = 1;

  // si el usuario esta autenticado:
  if (req.usuario) {
    const { password, descargas } = req.body;
    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};
const getEnlaceArchivo = async (req, res, next) => {
  const { url } = req.params;

  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: "URL no encontrada" });
    return next();
  }
  res.status(200).json({ archivo: enlace.nombre, password: false });
  next();
};

const todosLosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select("url -_id");
    console.log("enlaces", enlaces);
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
};
const tienePassword = async (req, res, next) => {
  const { url } = req.params;

  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: "URL no encontrada" });
    return next();
  }
  if (enlace.password) {
    return res.status(200).json({ password: true, enlace: enlace.url });
  }
  next();
};

const chequearPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  const enlace = await Enlace.findOne({ url });

  if (bcrypt.compareSync(password, enlace.password)) {
    next();
  } else {
    return res.status(401).json({ msg: "Password Incorrecto" });
  }
};

export { generarEnlace, getEnlaceArchivo, todosLosEnlaces, tienePassword, chequearPassword };

import Enlace from "../models/Enlace.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import shortid from "shortid";

const generarEnlace = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre_original, nombre } = req.body;
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
  console.log("enlace", enlace);

  if (!enlace) {
    res.status(404).json({ msg: "URL no encontrada" });
    return next();
  }
  res.status(200).json({ archivo: enlace.nombre });

  const { descargas, nombre } = enlace;

  if (descargas === 1) {
    //borro el archivo - paso el nombre por req al otro controlador
    req.archivo = nombre;
    //elimino la entrada de la db
    // await Enlace.findOneAndRemove(req.params.url);
    next();
  } else {
    enlace.descargas--;
    await enlace.save();
  }
};

export { generarEnlace, getEnlaceArchivo };

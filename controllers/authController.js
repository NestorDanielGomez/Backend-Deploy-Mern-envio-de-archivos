import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const autenticarUsuario = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  let usuario = await Usuario.findOne({ email });
  console.log(usuario);
  console.log("contraseña", password);
  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    return next();
  }

  if (bcrypt.compareSync(password, usuario.password)) {
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_KEY, {
      expiresIn: "10h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ msg: "password incorrecto" });
  }
};
const usuarioAutenticado = async (req, res) => {};

export { autenticarUsuario, usuarioAutenticado };

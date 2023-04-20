import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    // elimino la palabra Bearer del token
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    try {
      const usuario = jwt.verify(token, process.env.JWT_KEY);

      //lo asigno para pasarlo al controller
      req.usuario = usuario;
    } catch (error) {
      console.log("jwt no valido");
      console.log(error);
    }
  }
  return next();
};

export default auth;

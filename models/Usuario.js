import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, unique: true, lowervase: true },
    nombre: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuarios", usuarioSchema);
export default Usuario;

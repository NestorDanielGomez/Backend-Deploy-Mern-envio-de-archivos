import mongoose from "mongoose";

const enlacesSchema = mongoose.Schema({
  url: { type: String, required: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  nombre_original: { type: String, required: true, trim: true },
  descargas: { type: Number, required: true, trim: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", default: null },
  password: { type: String, default: null },
  creado: { type: Date, default: Date.now() },
});

const Enlace = mongoose.model("enlaces", enlacesSchema);
export default Enlace;

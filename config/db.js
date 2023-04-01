import mongoose from "mongoose";

export default async function conectarDB() {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`mongodb conectado en ${url}`);
    console.log("db conectada");
  } catch (error) {
    console.log("hubo un error", error);
    process.exit(1);
  }
}

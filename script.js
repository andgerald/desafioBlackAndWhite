const express = require("express");
const app = express();
const Jimp = require("jimp");
const uuid = require("uuid");

//Ruta para el css
app.use("/css", express.static(__dirname + "/assets/css"));

//Ruta raiz para visulizar el formulario
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cargar", async (req, res) => {
  try {
    const { imagen } = req.query;

    const image = await Jimp.read(`./${imagen}`);
    const cambioNombreImagen = uuid.v4().slice(0, 6);
    await image
      .resize(350, Jimp.AUTO)
      .greyscale()
      .writeAsync(`${cambioNombreImagen}.jpeg`);
    res.sendFile(`${cambioNombreImagen}`);
  } catch (error) {
    console.log("error en el catch: ", error.message);
    console.log("codigo del error en lectura de archivo: ", error.code);
    if (error.code == "ENOENT") {
      res.status(404).send("Archivo no encontrado");
    } else {
      res.status(500).send("Error al procesar la imagen");
    }
  }
});

app.listen(3000, () => {
  console.log(`Servidor funcionando en puerto 3000`);
});

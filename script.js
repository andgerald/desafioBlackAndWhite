//NO ME QUISE TOMAR MAS TIEMPO Y HASTA ACA LLEGUE

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
    const cambioNombreImagen = uuid.v4().slice(0, 6);
    const extension = `${cambioNombreImagen}.jpeg`;
    const image = await Jimp.read(imagen);
    await image.resize(350, Jimp.AUTO).greyscale().writeAsync(extension);
    res.sendFile(__dirname + "/" + extension);
  } catch (error) {
    console.log("error en el catch: ", error.message);
    console.log("codigo del error en lectura de archivo: ", error.code);
    if (error.code === "ENOENT") {
      res.send("Debes agregar una url");
    }
  }
});

app.listen(3000, () => {
  console.log(`Servidor funcionando en puerto 3000`);
});

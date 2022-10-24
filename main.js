const fs = require("fs");

const express = require("express");

const PORT = 8080;

const app = express();

const server = app.listen(PORT, () => {
          console.log(`App escuchando el puerto ${server.address().port}`);
        });

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
    this.id = 1;
    this.contenido = "";
  }

  async getRandom() {
    try {
        let contenido = await fs.promises.readFile(this.nombre, "utf-8")
        contenido= JSON.parse(contenido);
        const id = Math.floor(Math.random() * 3) + 1
          let seleccion = contenido.filter((e) => e.id == id);
          return seleccion
    } catch (err) {
      console.log("Hubo un error no se subio nada al servidor 28", err);
    }


        
  }

  async getAll() {
    try {
      let contenido = await fs.promises.readFile(this.nombre, "utf-8")
      contenido= JSON.parse(contenido);
      return contenido
  } catch (err) {
    console.log("Hubo un error no se subio nada al servidor 28", err);
  }
  }
}

const nuevoContenedor = new Contenedor("./productos.txt");





app.get("/productoRandom", async (req, res) => {
  const contenido = await nuevoContenedor.getRandom();
  
  res.send(contenido);
 
});

app.get("/productos", async (req, res) => {
  const contenido = await nuevoContenedor.getAll();
  
  res.send(contenido);
 
});


const fs=require('fs');

const express = require("express");

const PORT = 8080;

const app = express();


class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
        this.id = 1
        this.contenido=""
    }
    
    async getRandom(id){ 
        await fs.readFile(this.nombre,"utf-8",
        (err, contenido)=>{
            if (err) {
                console.log("Hubo un error no se subio nada al servidor",err)
            } else {
                contenido=JSON.parse(contenido)
                let seleccion=contenido.filter(e=>e.id==id)
                app.get("/productoRandom", (req, res) => {

                    console.log(req.query);
                  
                    res.send(seleccion);
                  
                  });
                
                  const server = app.listen(PORT, () => {
                
                    console.log(`App escuchando el puerto ${server.address().port}`);
                  
                  });
                  
                  server.on("error", (error) => console.log(error.message));



            }
        }
        )
    }
    
    async getAll(){
        await fs.readFile(this.nombre,"utf-8",
        (err, contenido)=>{
            if (err) {
                console.log("Hubo un error no se subio nada al servidor",err)
            } else {
                app.get("/productos", (req, res) => {

                    console.log(req.query);
                  
                    res.send(contenido);
                  
                  });
                
                  const server = app.listen(PORT, () => {
                
                    console.log(`App escuchando el puerto ${server.address().port}`);
                  
                  });
                  
                  server.on("error", (error) => console.log(error.message));
            }
        }
        )
    }
    
}

const nuevoContenedor =new Contenedor ('./productos.txt')

nuevoContenedor.getAll();
nuevoContenedor.getRandom(Math.floor(Math.random() * 3) + 1);


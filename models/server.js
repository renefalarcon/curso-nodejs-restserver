const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        // Middeware
        this.middleware();

        // Rutas de mi aplicacion
        this.routes();

    }

    middleware() {
        //Cors
        this.app.use(cors());

        // Lectura y parse del body
        this.app.use(express.json()); // todo lo que pase lo pasa como Json automaticamente
        
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {

       this.app.use(this.usuariosPath,require('../routers/usuarios'))
    }

    listen() {
        this.app.listen(this.port,()=>{
            console.log('Corriendo el servidor en el puerto: ',this.port);
        });
    }
}



module.exports = Server;

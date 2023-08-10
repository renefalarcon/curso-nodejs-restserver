const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.conectarBD();
        // Middeware
        this.middleware();

        //Coneccion a la base de datos

        // Rutas de mi aplicacion
        this.routes();

    }

    async conectarBD() {
        await dbConection();
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

       this.app.use(this.authPath,require('../routers/auth'))
       this.app.use(this.usuariosPath,require('../routers/usuarios'))
    }

    listen() {
        this.app.listen(this.port,()=>{
            console.log('Corriendo el servidor en el puerto: ',this.port);
        });
    }
}



module.exports = Server;
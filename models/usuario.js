const { Schema, model } = require("mongoose");


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'Este campo es obligatorio']
    },
    correo: {
        type: String,
        required: [true,'Este campo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true 
    },
    google: {
        type: Boolean,
        default: false
    }

});


usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}



module.exports = model('Usuario', usuarioSchema);
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs  = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");




const login = async(req,res=response) =>{

const {correo, password} = req.body;

try {

    // Verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if(!usuario) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        })
    }

    // Verificar si el usuario esta Activo
    if(!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: falso'
        })
    }
    // Verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validarPassword) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        })
    }
    // Generar el JWT
    const token = await generarJWT( usuario.id);

    res.json({
        msg: 'Login ok',
        usuario,
        token
    })
    

}catch(error) {
    console.log(error);
    res.status(500).json({
        msg:'Algo salio mal'
    });
}


}



module.exports={
    login
}
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs  = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const {googleVerify} = require("../helpers/google-verify");




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

const googleSingIn = async(req, res=response) => {
    
    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token )
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                rol: "USER_ROLE",
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
    const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
      
          });

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'El token no se pudo verificar'
        })
    }
    
}

module.exports={
    login,
    googleSingIn
}
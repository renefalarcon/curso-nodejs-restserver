const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuarioGet = async(req, res = response) =>{

    //const {nombre, edad, id, page=1} = req.query
    const { limite =5, desde=0 } = req.query;
    const query = {estado: true};
    //const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({total,usuarios});
}

const usuarioPost = async(req, res = response) =>{

    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // Grabar el usuario
    await usuario.save();
    
    res.json(usuario);
}

const usuarioPut = async(req, res = response) =>{

    const { id } = req.params;
    const { _id, password, google, correo,...resto } =req.body; // aqui sacamos lo que no se ocupa y en resto contiene lo que se ocupa
    
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
}

const usuarioDelete = async(req, res = response) =>{
    const { id } = req.params;

    //const usuario = await Usuario.findByIdAndRemove(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json(usuario);
}

const usuarioPatch = (req, res = response) =>{

    res.json({
        msg:'patch Api - usuarioPatch'
    });
}



module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}
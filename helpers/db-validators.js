const Role = require('../models/role');
const Usuario = require('../models/usuario')


const esRolValido = async(rol='') =>{
    const RolExiste = await Role.findOne({rol});
    if( !RolExiste ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}
const emailExiste = async(correo) =>{
    const ExisteEmail = await Usuario.findOne({correo})
    if (ExisteEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}
const usuarioExiste = async(id) =>{
    const ExisteUsuario = await Usuario.findById(id);
    if (!ExisteUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste
}
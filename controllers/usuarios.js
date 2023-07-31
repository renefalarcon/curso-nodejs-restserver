const {response} = require('express')


const usuarioGet = (req, res = response) =>{

    const {nombre, edad, id, page=1} = req.query
    res.json({
        msg:'get Api - usuarioGet',
        nombre,
        edad,
        id,
        page
    });
}

const usuarioPost = (req, res = response) =>{

    const {nombre,edad} = req.body;

    res.json({
        msg:'post Api - usuarioPost',
        nombre,
        edad
    });
}

const usuarioPut = (req, res = response) =>{

    const {id} = req.body; 
    res.json({
        msg:'put Api - usuarioPut',
        id
    });
}

const usuarioDelete = (req, res = response) =>{

    res.json({
        msg:'delete Api - usuarioDelete'
    });
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
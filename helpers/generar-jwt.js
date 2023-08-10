const jwt = require('jsonwebtoken')

const generarJWT = ( uid = '') =>{

    return new Promise((resolve, reject) => {

        const playload = { uid}

        jwt.sign(playload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(error,token)=>{
            if (error) {
                console.log(error);
                reject('No se pudo generar el webtoken')
            } else {
                resolve(token);
            }
        })
    })

}



module.exports = {
    generarJWT
}
const mongoose = require('mongoose');



const dbConection = async() => {

    try {
        await mongoose.connect(process.env.MONGO_ATLASDB, {
            /*useNewUrlParse:true,
            useUnifiedTopoligy: true,
            useCreateIndex: true,
            useFindAndModify: false*/
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la conexion a la base de datos');
    }


}




module.exports = {
    dbConection
}
const mongoose = require('mongoose');
require('dotenv').config();
const BD_USER = process.env.BD_USER
const BD_NAME = process.env.BD_NAME
const BD_CONTRASENA = process.env.BD_CONTRASENA

//Establecemos la conexion con MONGO DB
mongoose.connect(`mongodb+srv://${BD_USER}:${BD_CONTRASENA}@${BD_NAME}.ns7ni.mongodb.net/${BD_NAME}?authSource=admin&replicaSet=atlas-4ahd5z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;
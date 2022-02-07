const mongose = require("./conexion");
require('dotenv').config();
const express = require('express');
//const cors = require('cors') PROYECTOS INDEPENDIENTES
const PORT = 5000;
const app = express();
app.use(express.json());


//Routes
const user = require('./routes/user.routes');

//Use Routes
app.use('/user', user);

//servidor
app.listen(PORT,  () => {
    console.log(`Servidor corriendo en el puerto ` + PORT)
})

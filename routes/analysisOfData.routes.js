const express = require('express');
const router = express.Router();
const analysisOfData = require('../controllers/analysisOfData.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para traer publicaciones y el promedio de sus emociones
router.get('/getAnalysisPublications', middlewareLogin.middleLoginAdmin, analysisOfData.getAnalysisPublications);
 
//Exportar rutas a la App
module.exports = router;
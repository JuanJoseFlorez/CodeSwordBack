const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyPublications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Juego
router.post('/createHistory', historyController.createHistory);

//Ruta para actualizar Juego
router.put('/updateHistory', historyController.updateHistory);

//Ruta para eliminar Juego
router.delete('/deleteHistory', historyController.deleteHistory);

//Ruta para traer una lista de todos los Juegos
router.get('/getHistorys', historyController.getHistorys);

//Ruta para traer un Juego
router.get('/getHistory/:idUser', historyController.getHistory);
 
//Exportar rutas a la App
module.exports = router;
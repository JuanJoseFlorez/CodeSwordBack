const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyPublications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Historial
router.post('/createHistory', middlewareLogin.middleLogin, historyController.createHistory);

//Ruta para actualizar Historial
router.put('/updateHistory', middlewareLogin.middleLogin, historyController.updateHistory);

//Ruta para eliminar Historial
router.delete('/deleteHistory', middlewareLogin.middleLogin, historyController.deleteHistory);

//Ruta para traer una lista de todos los Historiales
router.get('/getHistorys', middlewareLogin.middleLoginAdmin, historyController.getHistorys);

//Ruta para traer el Historial de un usuario
router.get('/getHistory/:idUser', middlewareLogin.middleLogin, historyController.getHistory);
 
//Exportar rutas a la App
module.exports = router;
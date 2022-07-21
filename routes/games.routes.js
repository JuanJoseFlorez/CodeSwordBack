const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Juego
router.post('/createGame', middlewareLogin.middleLoginAdmin, gamesController.createGame);

//Ruta para actualizar Juego
router.put('/updateGame', middlewareLogin.middleLoginAdmin, gamesController.updateGame);

//Ruta para eliminar Juego
router.delete('/deleteGame', middlewareLogin.middleLoginAdmin, gamesController.deleteGame);

//Ruta para traer una lista de todos los Juegos
router.get('/getGames', gamesController.getGames);

//Ruta para traer un Juego
router.get('/getGame/:id', middlewareLogin.middleLoginAdmin, gamesController.getGame);

//Ruta para traer un juego sin ser admin
router.get('/getGameWithoutAdmin/:id', middlewareLogin.middleLogin, gamesController.getGameWithoutAdmin);

 
//Exportar rutas a la App
module.exports = router;
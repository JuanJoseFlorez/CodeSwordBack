const express = require('express');
const router = express.Router();
const favoriteGamesController = require('../controllers/favoriteGames.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Juego favorito
router.post('/createFavoriteGame', middlewareLogin.middleLogin, favoriteGamesController.createFavoriteGame);

//Ruta para eliminar Juego favorito
router.delete('/deleteFavoriteGame', middlewareLogin.middleLogin, favoriteGamesController.deleteFavoriteGame);

//Ruta para traer una lista de todos los Juegos favoritos
router.get('/getFavoriteGames', middlewareLogin.middleLoginAdmin, favoriteGamesController.getFavoriteGames);

//Ruta para traer Juegos favoritos de un usuario
router.get('/getFavoriteGame/:idUser', middlewareLogin.middleLogin, favoriteGamesController.getFavoriteGame);

//Exportar rutas a la App
module.exports = router;
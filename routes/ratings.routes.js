const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratings.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Juego
router.post('/createRating', middlewareLogin.middleLogin, ratingsController.createRating);

//Ruta para actualizar Juego
router.put('/updateRating', middlewareLogin.middleLogin, ratingsController.updateRating);

//Ruta para eliminar Juego
router.delete('/deleteRating', middlewareLogin.middleLogin, ratingsController.deleteRating);

//Ruta para traer una lista de todos los Juegos
router.get('/getRatings', ratingsController.getRatings);

//Ruta para traer un Juego
router.get('/getRating/:id', ratingsController.getRating);
 
//Exportar rutas a la App
module.exports = router;
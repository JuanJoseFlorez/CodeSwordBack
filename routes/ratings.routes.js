const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratings.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Calificación
router.post('/createRating', middlewareLogin.middleLogin, ratingsController.createRating);

//Ruta para actualizar Calificación
router.put('/updateRating', middlewareLogin.middleLogin, ratingsController.updateRating);

//Ruta para eliminar Calificación
router.delete('/deleteRating', middlewareLogin.middleLogin, ratingsController.deleteRating);

//Ruta para traer una lista de todas las Calificación
router.get('/getRatings', ratingsController.getRatings);

//Ruta para traer una Calificación
router.get('/getRating/:id', ratingsController.getRating);
 
//Exportar rutas a la App
module.exports = router;
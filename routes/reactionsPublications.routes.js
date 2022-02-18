const express = require('express');
const router = express.Router();
const reactionsPublicationsController = require('../controllers/reactionsPublications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Reacción de Publicación X
router.post('/createReaction', middlewareLogin.middleLogin, reactionsPublicationsController.createReaction);

//Ruta para actualizar Reacción de Publicación X
router.put('/updateReaction', middlewareLogin.middleLogin, reactionsPublicationsController.updateReaction);

//Ruta para eliminar Reacción de Publicación X
router.delete('/deleteReaction', middlewareLogin.middleLogin, reactionsPublicationsController.deleteReaction);

//Ruta para traer una lista de Reacciones de Publicación X
router.get('/getReactions', reactionsPublicationsController.getReactions);

//Ruta para traer una Reacción
router.get('/getReaction/:id', middlewareLogin.middleLogin, reactionsPublicationsController.getReaction);

//Ruta para traer una Reacción
router.post('/getReactionByUser', middlewareLogin.middleLogin, reactionsPublicationsController.getReactionByUser);
 
//Exportar rutas a la App
module.exports = router;
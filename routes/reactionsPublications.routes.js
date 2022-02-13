const express = require('express');
const router = express.Router();
const reactionsPublicationsController = require('../controllers/reactionsPublications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Comentario de Publicación X
router.post('/createReaction', middlewareLogin.middleLogin, reactionsPublicationsController.createReaction);

//Ruta para actualizar Comentario de Publicación X
router.put('/updateReaction', middlewareLogin.middleLogin, reactionsPublicationsController.updateReaction);

//Ruta para eliminar Comentario de Publicación X
router.delete('/deleteReaction', middlewareLogin.middleLogin, reactionsPublicationsController.deleteReaction);

//Ruta para traer una lista de Comentarios de Publicación X
router.get('/getReactions', reactionsPublicationsController.getReactions);

//Ruta para traer una Publicación
router.get('/getReaction/:id', middlewareLogin.middleLogin, reactionsPublicationsController.getReaction);
 
//Exportar rutas a la App
module.exports = router;
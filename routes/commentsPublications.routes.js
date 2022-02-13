const express = require('express');
const router = express.Router();
const commentsPublicationsController = require('../controllers/commentsPublications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Comentario de Publicación X
router.post('/createComment', middlewareLogin.middleLogin, commentsPublicationsController.createComment);

//Ruta para actualizar Comentario de Publicación X
router.put('/updateComment', middlewareLogin.middleLoginAdmin, commentsPublicationsController.updateComment);

//Ruta para eliminar Comentario de Publicación X
router.delete('/deleteComment', middlewareLogin.middleLogin, commentsPublicationsController.deleteComment);

//Ruta para traer una lista de Comentarios de Publicación X
router.get('/getComments', commentsPublicationsController.getComments);

//Ruta para traer una Publicación
router.get('/getComment/:id', middlewareLogin.middleLogin, commentsPublicationsController.getComment);
 
//Exportar rutas a la App
module.exports = router;
const express = require('express');
const router = express.Router();
const commentsTicketsController = require('../controllers/commentsTickets.controller')
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Comentario de Ticket X
router.post('/createComment', middlewareLogin.middleLogin, commentsTicketsController.createComment);

//Ruta para eliminar Comentario de Ticket X
router.delete('/deleteComment', middlewareLogin.middleLogin, commentsTicketsController.deleteComment);

//Ruta para traer una lista de Comentarios de todos los Tickets 
router.get('/getComments', middlewareLogin.middleLoginAdmin, commentsTicketsController.getComments);

//Ruta para traer los comentarios de un Ticket X
router.get('/getComment/:idTicket', middlewareLogin.middleLogin, commentsTicketsController.getComment);
 
//Exportar rutas a la App
module.exports = router;
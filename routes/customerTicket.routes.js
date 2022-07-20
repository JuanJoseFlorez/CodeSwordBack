const express = require('express');
const router = express.Router();
const customerTicketController = require('../controllers/customerTicket.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Ticket
router.post('/createTicket', middlewareLogin.middleLogin,customerTicketController.createTicket);

//Ruta para desactivar Ticket
router.put('/desactivateTicket', middlewareLogin.middleLoginAdmin,customerTicketController.desactivateTicket);

//Ruta para traer una lista de todos los Ticket
router.get('/getTickets', middlewareLogin.middleLoginAdmin, customerTicketController.getTickets);

//Ruta para traer una lista de todos los Ticket por Usuario
router.get('/getTicket/:idUser', middlewareLogin.middleLogin, customerTicketController.getTicket);

//Exportar rutas a la App
module.exports = router;
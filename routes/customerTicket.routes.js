const express = require('express');
const router = express.Router();
const customerTicketController = require('../controllers/customerTicket.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Categoria
router.post('/createTicket', middlewareLogin.middleLogin,customerTicketController.createTicket);

//Ruta para traer una lista de todas las Categorias
router.get('/getTickets', middlewareLogin.middleLoginAdmin, customerTicketController.getTickets);

//Ruta para traer una Categoria
router.get('/getTicket/:id', middlewareLogin.middleLogin, customerTicketController.getTicket);

//Exportar rutas a la App
module.exports = router;
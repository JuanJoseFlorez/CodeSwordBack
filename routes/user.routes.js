const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Usuario
router.post('/createUser', userController.createUser);

//Ruta para actualizar Usuario
router.put('/updateUser', middlewareLogin.middleLogin, userController.updateUser);

//Ruta para actualizar Usuario
router.delete('/deleteUser', middlewareLogin.middleLogin, userController.deleteUser);

//Ruta para loguearse
router.post('/login', userController.loginUser);

//Ruta para validar el token de X usuario
router.get('/validateToken/:token', userController.validateToken);

//Exportar rutas a la App
module.exports = router;
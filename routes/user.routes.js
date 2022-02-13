const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Usuario
router.post('/createUser', userController.createUser);

//Ruta para actualizar Usuario
router.put('/updateUser', middlewareLogin.middleLogin, userController.updateUser);

//Ruta para actualizar Usuario
router.delete('/deleteUser', middlewareLogin.middleLoginAdmin, userController.deleteUser);

//Ruta para loguearse
router.post('/login', userController.loginUser);

//Ruta para validar el token de X usuario o administrador
router.get('/validateToken', userController.validateToken);

//Ruta para traer una lista de todos los usuarios
router.get('/getUsers', middlewareLogin.middleLoginAdmin, userController.getUsers);

//Ruta para traer un usuario
router.get('/getUser/:id', middlewareLogin.middleLoginAdmin, userController.getUser);

//Exportar rutas a la App
module.exports = router;
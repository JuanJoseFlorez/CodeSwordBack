const express = require('express');
const router = express.Router();
const filterLabelsController = require('../controllers/filterLabels.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Etiqueta
router.post('/createLabel', middlewareLogin.middleLoginAdmin,filterLabelsController.createLabel);

//Ruta para actualizar Etiqueta
router.put('/updateLabel', middlewareLogin.middleLoginAdmin, filterLabelsController.updateLabel);

//Ruta para eliminar Categoria
router.delete('/deleteLabel', middlewareLogin.middleLoginAdmin, filterLabelsController.deleteLabel);

//Ruta para traer una lista de todas las Etiquestas
router.get('/getLabels', middlewareLogin.middleLoginAdmin, filterLabelsController.getLabels);

//Ruta para traer una Etiqueta
router.get('/getLabel/:id', middlewareLogin.middleLoginAdmin, filterLabelsController.getLabel);

//Exportar rutas a la App
module.exports = router;
const express = require('express');
const router = express.Router();
const publicationsController = require('../controllers/publications.controller');
const middlewareLogin = require('../middlewares/middlewareLogin');

//Ruta para crear Publicación
router.post('/createPublication', middlewareLogin.middleLoginAdmin, publicationsController.createPublication);

//Ruta para actualizar Publicación
router.put('/updatePublication', middlewareLogin.middleLoginAdmin, publicationsController.updatePublication);

//Ruta para eliminar Publicación
router.delete('/deletePublication', middlewareLogin.middleLoginAdmin, publicationsController.deletePublication);

//Ruta para traer una lista de todas las Publicaciones
router.get('/getPublications', publicationsController.getPublications);

//Ruta para traer una Publicación
router.get('/getPublication/:id', publicationsController.getPublication);

//Ruta para traer una Publicación de acuerdo a una categoria
router.get('/getPublicationOfCategory/:id', publicationsController.getPublicationOfCategory);

//Ruta para traer una Publicación de acuerdo a unas Etiquetas
router.post('/getPublicationOfLabels', publicationsController.getPublicationOfLabels);
 
//Exportar rutas a la App
module.exports = router;
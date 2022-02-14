const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const publications = mongose.model("publications",{
    name: String,
    idCategory: String,
    idLabels: Array,
    description: String,
    idUser: String,
    bannerImage: String,
    publishedAt: String
})

const createPublication = async (req, res) => {
    const { name, idCategory, idLabels, description, idUser, bannerImage, publishedAt } = req.body;

    if(!name || !idCategory || !idLabels || !description || !idUser || !bannerImage || !publishedAt) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_publication = {
            name: name,
            idCategory: idCategory,
            idLabels: idLabels,
            description: description,
            idUser: idUser,
            bannerImage: bannerImage,
            publishedAt: publishedAt
        }

        try{
            const result = new publications(result_publication);
            const response = await result.save();

            res.status(200).json({ message: "Publicación creada con éxito", publicacion: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updatePublication = async (req, res) => {

    const { id, name, idCategory, idLabels, description, bannerImage, publishedAt } = req.body;

    if(!id || !name || !idCategory || !idLabels || !description || !bannerImage || !publishedAt){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await publications.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La publicación no existe"});

        const filter = { _id: id }

        let result_publication = {
            $set:{
                name: name,
                idCategory: idCategory,
                idLabels: idLabels,
                description: description,
                bannerImage: bannerImage,
                publishedAt: publishedAt
            },
        }

        try{
            const result = await publications.updateOne(filter, result_publication);

            res.status(200).json({ message: "Publicación actualizada con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deletePublication = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await publications.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La publicación no existe"});

        try{
            const result = await publications.deleteOne({ _id: id });
            res.status(200).json({ message: "Publicación eliminada con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getPublications = async (req, res) =>{
    try {
        const response = await publications.find({});
        res.status(200).json({msq: "Publicaciones obtenidas con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener las Publicaciones" ,  resultado  : e})
    }
}

const getPublication = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await publications.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "La publicación no existe"});

            res.status(200).json({msq: "Publicación obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener una Publicación" ,  resultado  : e})
        }
    }
}

exports.createPublication = createPublication
exports.updatePublication = updatePublication
exports.deletePublication = deletePublication
exports.getPublications = getPublications
exports.getPublication = getPublication
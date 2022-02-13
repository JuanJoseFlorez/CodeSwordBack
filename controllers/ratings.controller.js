const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const ratings = mongose.model("ratings",{
    idUser: String,
    estrellas: Number
})

const createRating = async (req, res) => {
    const { idUser, estrellas } = req.body;

    if(!idUser || !estrellas) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_rating = {
            idUser: idUser,
            estrellas: estrellas
        }

        try{
            const result = new ratings(result_rating);
            const response = await result.save();

            res.status(200).json({ message: "Calificación creada con éxito", calificacion: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateRating = async (req, res) => {

    const { id, estrellas } = req.body;

    if(!id || !estrellas){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await ratings.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La calificación no existe"});

        const filter = { _id: id }

        let result_rating = {
            $set:{
                estrellas: estrellas
            },
        }

        try{
            const result = await ratings.updateOne(filter, result_rating);

            res.status(200).json({ message: "Calificación actualizada con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteRating = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await ratings.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La calificación no existe"});

        try{
            const result = await ratings.deleteOne({ _id: id });
            res.status(200).json({ message: "Calificación eliminada con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getRatings = async (req, res) =>{
    try {
        const response = await ratings.find({});
        res.status(200).json({msq: "Calificaciones obtenidas con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener las Calificaciones" ,  resultado  : e})
    }
}

const getRating = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await ratings.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "La calificación no existe"});

            res.status(200).json({msq: "Calificación obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener la Calificación" ,  resultado  : e})
        }
    }
}

exports.createRating = createRating
exports.updateRating = updateRating
exports.deleteRating = deleteRating
exports.getRatings = getRatings
exports.getRating = getRating
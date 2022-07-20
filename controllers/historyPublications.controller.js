const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const historyPublications = mongose.model("history_publications",{
    idPublication: String,
    idUser: String,
    viewDate: Date
})

const createHistory = async (req, res) => {
    const { idPublication, idUser } = req.body;

    if(!idPublication || !idUser) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await historyPublications.findOne({ idPublication: idPublication, idUser: idUser });
        if(searchResult != null) return res.status(200).json({ message: "La publicación ya fue vista"});

        const creationDate = new Date();

        let result_history = {
            idPublication: idPublication,
            idUser: idUser,
            viewDate: creationDate
        }

        try{
            const result = new historyPublications(result_history);
            const response = await result.save();

            res.status(200).json({ message: "Historial creado con éxito"})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateHistory = async (req, res) => {

    const { id, idPublication, idUser } = req.body;

    if(!idPublication || !idUser || !id){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await historyPublications.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "El historial no existe"});

        const filter = { _id: id }
        const creationDate = new Date();

        let result_history = {
            $set:{
                idPublication: idPublication,
                idUser: idUser,
                viewDate: creationDate
            },
        }

        try{
            const result = await historyPublications.updateOne(filter, result_history);

            res.status(200).json({ message: "Historial actualizado con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteHistory = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await historyPublications.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "el historial no existe"});

        try{
            const result = await historyPublications.findByIdAndDelete( id );
            res.status(200).json({ message: "Historial eliminado con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getHistorys = async (req, res) =>{
    try {
        const response = await historyPublications.find({});
        res.status(200).json({msq: "Historiales obtenidos con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener los historiales" ,  resultado  : e})
    }
}

const getHistory = async (req, res) =>{

    const { idUser } = req.params;

    if(!idUser){
        return res.status(400).json({ message: "El ID del usuario es requerido"})
    } else {
        try {
            const response = await historyPublications.find({ idUser: idUser });
            if(response === null) return res.status(404).json({ message: "El historial no existe"});

            res.status(200).json({msq: "Historial obtenido con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener el historial" ,  resultado  : e})
        }
    }
}

exports.createHistory = createHistory
exports.updateHistory = updateHistory
exports.deleteHistory = deleteHistory
exports.getHistorys = getHistorys
exports.getHistory = getHistory
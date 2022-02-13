const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const filterLabels = mongose.model("filter_labels",{
    name: String,
    description: String,
    color: String,
    idUser: String,
    creationDate: Date
})

const createLabel = async (req, res) => {
    const { name, description, color, idUser } = req.body;

    if(!name || !description || !color || !idUser) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const creationDate = new Date();

        let result_label = {
            name: name,
            description: description,
            color: color,
            idUser: idUser,
            creationDate: creationDate
        }

        try{
            const result = new filterLabels(result_label);
            const response = await result.save();

            res.status(200).json({ message: "Etiqueta creada con éxito", categoria: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateLabel = async (req, res) => {

    const { id, name, description, color } = req.body;

    if(!id || !name || !description || !color){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await filterLabels.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La etiqueta no existe"});

        const filter = { _id: id }

        let result_label = {
            $set:{
                name: name,
                description: description,
                color: color
            },
        }

        try{
            const result = await filterLabels.updateOne(filter, result_label);

            res.status(200).json({ message: "Etiqueta actualizada con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteLabel = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await filterLabels.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La etiqueta no existe"});

        try{
            const result = await filterLabels.deleteOne({ _id: id });
            res.status(200).json({ message: "Etiqueta eliminada con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getLabels = async (req, res) =>{
    try {
        const response = await filterLabels.find({});
        res.status(200).json({msq: "Etiquetas obtenidas con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener las Etiquetas" ,  resultado  : e})
    }
}

const getLabel = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await filterLabels.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "La etiqueta no existe"});

            res.status(200).json({msq: "Etiqueta obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener la Etiqueta" ,  resultado  : e})
        }
    }
}

exports.createLabel = createLabel
exports.updateLabel = updateLabel
exports.deleteLabel = deleteLabel
exports.getLabels = getLabels
exports.getLabel = getLabel
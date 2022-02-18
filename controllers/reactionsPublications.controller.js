const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const reactions = mongose.model("reactions_publications",{
    name: String,
    idUser: String,
    idPublication: String
})

const createReaction = async (req, res) => {
    const { name, idUser, idPublication } = req.body;

    if(!name || !idUser || !idPublication) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_reaction = {
            name: name,
            idUser: idUser,
            idPublication: idPublication
        }

        try{
            const result = new reactions(result_reaction);
            const response = await result.save();

            res.status(200).json({ message: "Reacción creada con éxito", comentario: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateReaction = async (req, res) => {

    const { id, name } = req.body;

    if(!id || !name){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await reactions.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La reacción no existe"});

        const filter = { _id: id }

        let result_reaction = {
            $set:{
                name: name
            },
        }

        try{
            const result = await reactions.updateOne(filter, result_reaction);

            res.status(200).json({ message: "Reacción actualizada con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteReaction = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await reactions.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La reacción no existe"});

        try{
            const result = await reactions.findByIdAndDelete( id );
            res.status(200).json({ message: "Reacción eliminada con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getReactions = async (req, res) =>{

    const { idPublication } = req.body;

    if(!idPublication){
        return res.status(400).json({ message: "El ID de la publicación es requerido"})
    } else {

        try {
            const response = await reactions.find({ idPublication: idPublication });
            res.status(200).json({msq: "Reacciones obtenidas con éxito", resultado: response})
        } catch (e) {
            console.log(e)
            res.status(400).json({ msq : "Ocurrio un error al obtener los Comentarios" ,  resultado  : e})
        }
    }
}

const getReaction = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await reactions.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "La reacción no existe"});

            res.status(200).json({msq: "Reacción obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener la Reacción" ,  resultado  : e})
        }
    }
}

const getReactionByUser = async (req, res) =>{

    const { idPublication, idUser } = req.body;
    //const { pruebass } = res.locals;

    if(!idPublication || !idUser){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            
            const response = await reactions.findOne({ idUser: idUser, idPublication: idPublication});
            if(response === null) return res.status(404).json({ message: "El usuario no ha reaccionado"});

            res.status(200).json({msq: "Reacción obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener la Reacción" ,  resultado  : e})
        }
    }
}

exports.createReaction = createReaction
exports.updateReaction = updateReaction
exports.deleteReaction = deleteReaction
exports.getReactions = getReactions
exports.getReaction = getReaction
exports.getReactionByUser = getReactionByUser
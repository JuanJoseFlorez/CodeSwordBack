const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const comments = mongose.model("comments_publications",{
    content: String,
    idUser: String,
    idPublication: String
})

const createComment = async (req, res) => {
    const { content, idUser, idPublication } = req.body;

    if(!content || !idUser || !idPublication) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_comment = {
            content: content,
            idUser: idUser,
            idPublication: idPublication
        }

        try{
            const result = new comments(result_comment);
            const response = await result.save();

            res.status(200).json({ message: "Comentario creado con éxito", comentario: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateComment = async (req, res) => {

    const { id, content } = req.body;

    if(!id || !content){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await comments.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "El comentario no existe"});

        const filter = { _id: id }

        let result_comment = {
            $set:{
                content: content
            },
        }

        try{
            const result = await comments.updateOne(filter, result_comment);

            res.status(200).json({ message: "Comentario actualizado con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteComment = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await comments.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "El comentario no existe"});

        try{
            const result = await comments.findByIdAndDelete( id );
            res.status(200).json({ message: "Comentario eliminado con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getComments = async (req, res) =>{

    const { idPublication } = req.params;

    if(!idPublication){
        return res.status(400).json({ message: "El ID de la publicación es requerido"})
    } else {

        try {
            const response = await comments.find({ idPublication: idPublication });
            res.status(200).json({msq: "Comentarios obtenidos con éxito", resultado: response})
        } catch (e) {
            console.log(e)
            res.status(400).json({ msq : "Ocurrio un error al obtener los Comentarios" ,  resultado  : e})
        }
    }
}

const getComment = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await comments.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "El comentario no existe"});

            res.status(200).json({msq: "Comentario obtenido con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener el Comentario" ,  resultado  : e})
        }
    }
}

exports.createComment = createComment
exports.updateComment = updateComment
exports.deleteComment = deleteComment
exports.getComments = getComments
exports.getComment = getComment
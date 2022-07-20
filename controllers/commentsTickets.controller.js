const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const comments = mongose.model("comments_tickets",{
    content: String,
    idUser: String,
    idTicket: String
})

const createComment = async (req, res) => {
    const { content, idUser, idTicket } = req.body;

    if(!content || !idUser || !idTicket) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {
        try{

            let result_comment = {
                content: content,
                idUser: idUser,
                idTicket: idTicket
            }

            const result = new comments(result_comment);
            const response = await result.save();

            res.status(200).json({ message: "Comentario creado con éxito", comentario: response})
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

    try {
        const response = await comments.find({});
        res.status(200).json({msq: "Comentarios obtenidos con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener los Comentarios" ,  resultado  : e})
    }
    
}

const getComment = async (req, res) =>{

    const { idTicket } = req.params;

    if(!idTicket){
        return res.status(400).json({ message: "El ID del Ticket es requerido"})
    } else {
        try {
            const response = await comments.find({ idTicket: idTicket });
            if(response === null) return res.status(404).json({ message: "Los comentarios no existen"});

            res.status(200).json({msq: "Comentarios obtenidos con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener los comentarios" ,  resultado  : e})
        }
    }
}

exports.createComment = createComment
exports.deleteComment = deleteComment
exports.getComments = getComments
exports.getComment = getComment

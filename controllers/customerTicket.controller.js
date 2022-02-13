const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const customerTicket = mongose.model("customer_ticket",{
    title: String,
    description: String,
    images: Array,
    files: Array,
    idUser: String,
    idGame: String
})

const createTicket = async (req, res) => {
    const { title, description, images, files, idUser, idGame } = req.body;

    if(!title || !description || !images || !files || !idUser || !idGame) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_Ticket = {
            title: title,
            description: description,
            images: images,
            files: files,
            idUser: idUser,
            idGame: idGame
        }

        try{
            const result = new customerTicket(result_Ticket);
            const response = await result.save();

            res.status(200).json({ message: "Ticket creado con éxito", Ticket: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const getTickets = async (req, res) =>{
    try {
        const response = await customerTicket.find({});
        res.status(200).json({msq: "Tickets obtenidos con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener los Tickets" ,  resultado  : e})
    }
}

const getTicket = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await customerTicket.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "El ticket no existe"});

            res.status(200).json({msq: "Ticket obtenido con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener el Ticket" ,  resultado  : e})
        }
    }
}

exports.createTicket = createTicket
exports.getTickets = getTickets
exports.getTicket = getTicket
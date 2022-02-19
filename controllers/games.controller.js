const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const games = mongose.model("games",{
    image: String,
    name: String,
    description: String,
    author: String,
    idLabels: Array
})

const createGame = async (req, res) => {
    const { image, name, description, author, idLabels } = req.body;

    if(!image || !name || !description || !author || !idLabels || !calificacion) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_game = {
            image: image,
            name: name,
            description: description,
            author: author,
            idLabels: idLabels
        }

        try{
            const result = new games(result_game);
            const response = await result.save();

            res.status(200).json({ message: "Juego creado con éxito", juego: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateGame = async (req, res) => {

    const { id, image, name, description, author, idLabels } = req.body;

    if(!id || !image || !name || !description || !author || !idLabels){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await games.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "El juego no existe"});

        const filter = { _id: id }

        let result_game = {
            $set:{
                image: image,
                name: name,
                description: description,
                author: author,
                idLabels: idLabels
            },
        }

        try{
            const result = await games.updateOne(filter, result_game);

            res.status(200).json({ message: "Juego actualizado con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteGame = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await games.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "El juego no existe"});

        try{
            const result = await games.findByIdAndDelete( id );
            res.status(200).json({ message: "Juego eliminado con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getGames = async (req, res) =>{
    try {
        const response = await games.find({});
        res.status(200).json({msq: "Juegos obtenidos con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener los Juegos" ,  resultado  : e})
    }
}

const getGame = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await games.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "El juego no existe"});

            res.status(200).json({msq: "Juego obtenido con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener el Juego" ,  resultado  : e})
        }
    }
}

exports.createGame = createGame
exports.updateGame = updateGame
exports.deleteGame = deleteGame
exports.getGames = getGames
exports.getGame = getGame
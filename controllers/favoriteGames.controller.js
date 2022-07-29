const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const favoriteGames = mongose.model("favorite_games",{
    idUser: String,
    idGame: String
})

const createFavoriteGame = async (req, res) => {
    const { idUser, idGame } = req.body;

    if(!idUser || !idGame) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await favoriteGames.findOne({ idUser: idUser, idGame: idGame });
        if(searchResult != null) return res.status(200).json({ message: "El usuario ya tiene el juego como favorito"});

        let result_favorite_game = {
            idUser: idUser,
            idGame: idGame
        }

        try{
            const result = new favoriteGames(result_favorite_game);
            const response = await result.save();

            res.status(200).json({ message: "Juego favorito creado con éxito", juegoFavorito: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteFavoriteGame = async (req, res) =>{

    const { idGame, idUser } = req.body;

    if(!idGame || !idUser){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await favoriteGames.findOne({ idGame: idGame, idUser: idUser });
        if(searchResult === null) return res.status(404).json({ message: "El juego favorito no existe"});

        try{
            const result = await favoriteGames.findOneAndDelete({ idGame: idGame, idUser: idUser });
            res.status(200).json({ message: "Juego favorito fue eliminado con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getFavoriteGames = async (req, res) =>{
    try {
        const response = await favoriteGames.find({});
        res.status(200).json({msq: "Juegos favoritos obtenidos con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener los Juegos favoritos" ,  resultado  : e})
    }
}

const getFavoriteGame = async (req, res) =>{

    const { idUser } = req.params;

    if(!idUser){
        return res.status(400).json({ message: "El ID del usuario es requerido"})
    } else {
        try {
            const response = await favoriteGames.find({ idUser: idUser });
            if(response === null) return res.status(404).json({ message: "El usuario no tiene juegos favoritos"});

            res.status(200).json({msq: "Juegos favoritos obtenido con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener los Juegos favoritos" ,  resultado  : e})
        }
    }
}

exports.createFavoriteGame = createFavoriteGame
exports.deleteFavoriteGame = deleteFavoriteGame
exports.getFavoriteGames = getFavoriteGames
exports.getFavoriteGame = getFavoriteGame

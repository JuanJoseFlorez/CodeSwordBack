const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const publications = mongose.model("publications",{
    name: String,
    idCategory: String,
    idLabels: Array,
    description: String,
    idUser: String
})

const createPublication = async (req, res) => {
    const { name, idCategory, idLabels, description, idUser } = req.body;

    if(!name || !idCategory || !idLabels || !description || !idUser) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        let result_publication = {
            name: name,
            idCategory: idCategory,
            idLabels: idLabels,
            description: description,
            idUser: idUser
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


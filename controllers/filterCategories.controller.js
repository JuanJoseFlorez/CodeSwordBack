const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const filterCategories = mongose.model("filter_categories",{
    name: String,
    description: String,
    idUser: String,
    creationDate: Date
})

const createCategory = async (req, res) => {
    const { name, description, idUser } = req.body;

    if(!name || !description || !idUser) {
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        //const searchResult = await filterCategories.findOne({ name: name });
        //if(searchResult != null) return res.status(400).json({ message: "La categoria ya existe"});

        const creationDate = new Date();

        let result_category = {
            name: name,
            description: description,
            idUser: idUser,
            creationDate: creationDate
        }

        try{
            const result = new filterCategories(result_category);
            const response = await result.save();

            res.status(200).json({ message: "Categoria creada con éxito", categoria: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateCategory = async (req, res) => {

    const { id, name, description } = req.body;

    if(!id || !name || !description){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const searchResult = await filterCategories.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La categoria no existe"});

        const filter = { _id: id }

        let result_category = {
            $set:{
                name: name,
                description: description
            },
        }

        try{
            const result = await filterCategories.updateOne(filter, result_category);

            res.status(200).json({ message: "Categoria actualizada con éxito", result: result});
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteCategory = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        const searchResult = await filterCategories.findOne({ _id: id });
        if(searchResult === null) return res.status(404).json({ message: "La categoria no existe"});

        try{
            const result = await filterCategories.deleteOne({ _id: id });
            res.status(200).json({ message: "Categoria eliminada con éxito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const getCategories = async (req, res) =>{
    try {
        const response = await filterCategories.find({});
        res.status(200).json({msq: "Categorias obtenidas con éxito", resultado: response})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener las Categorias" ,  resultado  : e})
    }
}

const getCategory = async (req, res) =>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {
        try {
            const response = await filterCategories.findOne({ _id: id });
            if(response === null) return res.status(404).json({ message: "La categoria no existe"});

            res.status(200).json({msq: "Categoria obtenida con éxito", resultado: response})

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq : "Ocurrio un error al obtener la Categoria" ,  resultado  : e})
        }
    }
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

exports.createCategory = createCategory
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory
exports.getCategories = getCategories
exports.getCategory = getCategory
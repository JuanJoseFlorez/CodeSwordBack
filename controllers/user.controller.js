const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userCollention = mongose.model("user",{
    profileImage: String,
    user: String, 
    name: String, 
    email: String, 
    password: String
})

const createUser = async (req, res) => {
    const { profileImage, user, name, email, password } = req.body;

    if(!profileImage || !user || !name || !email || !password){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const encrypted_password = bcrypt.hashSync(password, 10);
        
        let result_user = {
            profileImage: profileImage,
            user: user,
            name: name,
            email: email,
            password: encrypted_password
        }

        try{
            const result = new userCollention(result_user);
            const response = await result.save();
            res.status(200).json({ message: "Usuario creado con éxito", usuario: response})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateUser = async (req, res) => {

    const { id, profileImage, user, name, email, password } = req.body;

    if(!id || !profileImage || !user || !name || !email || !password){
        return res.status(400).json({ message: "Datos requeridos"})
    } else {

        const encrypted_password = bcrypt.hashSync(password, 10);
        
        const filter = { _id: id }

        let result_user = {
            $set:{
                profileImage: profileImage,
                user: user,
                name: name,
                email: email,
                password: encrypted_password
            },
        }

        try{
            const result = await userCollention.updateOne(filter, result_user)
            res.status(200).json({ message: "Usuario actualizado con éxito", result: result})
        }catch(error){ 
            res.status(500).json({ mesaage: "Ocurrio un error", error: error})
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteUser = async (req, res) =>{

    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: "El ID es requerido"})
    } else {

        try{
            const result = await userCollention.deleteOne({ _id: id });
            res.status(200).json({ message: "Usuario eliminado con exito"});

        }catch(error){
            res.status(500).json({ message: "Ocurrio un error al eliminar"})
        }

    }

}

const loginUser = async (req, res) => {
    try{

        const { email, password } = req.body;
        const result = await userCollention.findOne({ email: email});

        const validacion = bcrypt.compareSync(password, result.password);

        if(!validacion){
            res.status(401).json({ message: "Usuario o contraseña invalida"})
        } else {

            //console.log(result);

            const payload = { 
                profileImage: result.profileImage,
                user: result.user,
                name: result.name,
                email: result.email, 
                password: result.password 
            };

            const jwtToken = jwt.sign(payload, process.env.LLAVE,{
                expiresIn: '24h'
            })

            res.status(200).json({ 
                message: "Inicio de sesión éxitoso",
                token: jwtToken
            })

        }
        
    }catch(error){
        res.status(500).json({ message: "Ocurrio un error"})
        console.error(`Ocurrio un error: ${error}`);
    }
}

const validateToken = async (req, res) => {
    const { token } = req.params

    if(!token){
        return res.status(401).json({ message:"datos faltantes"});
    }
    
    jwt.verify(token, process.env.LLAVE, (error, decoded) =>{
        if(error){
            return res.status(401).json({ message: "Token Invalido" });
        }else{
            return res.status(200).json({ message: "Token Valido", datos: decoded });
        }
    })
}

exports.createUser = createUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.loginUser = loginUser
exports.validateToken = validateToken
const mongose = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const userCollention = mongose.model("user", {
    profileImage: String,
    user: String,
    typeUser: Number,
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    gender: String,
    birthDate: String,
    country: String
})

const createUser = async (req, res) => {
    const { profileImage, user, typeUser, name, email, password, phoneNumber, gender, birthDate, country } = req.body;

    if (!profileImage || !user || !typeUser || !name || !email || !password || !phoneNumber || !gender || !birthDate || !country) {
        return res.status(400).json({ message: "Datos requeridos" })
    } else {

        const searchEmail = await userCollention.findOne({ email: email });
        if (searchEmail != null) return res.status(400).json({ message: `Ya existe un usuario con el correo: ${email}` });

        const encrypted_password = bcrypt.hashSync(password, 10);

        let result_user = {
            profileImage: profileImage,
            user: user,
            typeUser: typeUser,
            name: name,
            email: email,
            password: encrypted_password,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDate: birthDate,
            country: country,
        }

        try {
            const result = new userCollention(result_user);
            const response = await result.save();
            res.status(200).json({ message: "Usuario creado con éxito", usuario: response })
        } catch (error) {
            res.status(500).json({ mesaage: "Ocurrio un error", error: error })
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const updateUser = async (req, res) => {

    const { id, profileImage, user, typeUser, name, email, password, phoneNumber, gender, birthDate, country } = req.body;

    if (!id || !profileImage || !user || !typeUser || !name || !email || !password || !phoneNumber || !gender || !birthDate || !country) {
        return res.status(400).json({ message: "Datos requeridos" })
    } else {

        const searchResult = await userCollention.findOne({ _id: id });
        const searchEmail = await userCollention.findOne({ email: email });

        if (searchResult === null) return res.status(404).json({ message: "El usuario no existe" });
        if (searchEmail != null && searchResult.email != email) return res.status(400).json({ message: `Ya existe un usuario con el correo: ${email}` });

        const encrypted_password = password != searchResult.password ? bcrypt.hashSync(password, 10) : password;

        const filter = { _id: id }

        let result_user = {
            $set: {
                profileImage: profileImage,
                user: user,
                typeUser: typeUser,
                name: name,
                email: email,
                password: encrypted_password,
                phoneNumber: phoneNumber,
                gender: gender,
                birthDate: birthDate,
                country: country,
            },
        }

        const payload = {
            id: searchResult.id,
            profileImage: profileImage,
            user: user,
            typeUser: typeUser,
            name: name,
            email: email,
            password: encrypted_password,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDate: birthDate,
            country: country
        };


        const jwtToken = jwt.sign(payload, process.env.LLAVE, {
            expiresIn: '24h'
        })


        try {
            const result = await userCollention.updateOne(filter, result_user)
            res.status(200).json({ message: "Usuario actualizado con éxito", token: jwtToken })
        } catch (error) {
            res.status(500).json({ mesaage: "Ocurrio un error", error: error })
            console.error(`Ocurrio un error: ${error}`);
        }
    }
}

const deleteUser = async (req, res) => {

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "El ID es requerido" })
    } else {

        const seatchResult = await userCollention.findOne({ _id: id });
        if (seatchResult === null) return res.status(404).json({ message: "El usuario no existe" });

        try {
            const result = await userCollention.findByIdAndDelete(id);
            res.status(200).json({ message: "Usuario eliminado con exito" });

        } catch (error) {
            res.status(500).json({ message: "Ocurrio un error al eliminar" })
        }

    }

}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const result = await userCollention.findOne({ email: email });

        if (result === null) res.status(401).json({ message: "Usuario o contraseña invalida" })

        const validacion = bcrypt.compareSync(password, result.password);

        if (!validacion) {
            res.status(401).json({ message: "Usuario o contraseña invalida" })
        } else {

            const payload = {
                id: result.id,
                profileImage: result.profileImage,
                user: result.user,
                typeUser: result.typeUser,
                name: result.name,
                email: result.email,
                password: result.password,
                phoneNumber: result.phoneNumber,
                gender: result.gender,
                birthDate: result.birthDate,
                country: result.country,
            };

            const jwtToken = jwt.sign(payload, process.env.LLAVE, {
                expiresIn: '24h'
            })

            res.status(200).json({
                message: "Inicio de sesión éxitoso",
                token: jwtToken
            })

        }

    } catch (error) {
        res.status(500).json({ message: "Ocurrio un error" })
        console.error(`Ocurrio un error: ${error}`);
    }
}

const validateToken = async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "datos faltantes" });
    }

    const jwtClient = token.split(" ")[1];

    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Invalido" });
        } else {
            return res.status(200).json({ message: "Token Valido", datos: decoded });
        }
    })
}

const getUsers = async (req, res) => {
    try {
        const response = await userCollention.find({ typeUser: 1 });
        res.status(200).json({ msq: "Usuarios obtenidos con exito", resultado: response })
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq: "Ocurrio un error al obtener los Usuarios", resultado: e })
    }
}

const getUser = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "El ID es requerido" })
    } else {
        try {
            const response = await userCollention.findOne({ typeUser: 1, _id: id });
            if (response === null) return res.status(404).json({ message: "El usuario no existe" });

            res.status(200).json({ msq: "Usuario obtenido con exito", resultado: response })

        } catch (e) {
            console.log(e);
            res.status(400).json({ msq: "Ocurrio un error al obtener el usuario", resultado: e })
        }
    }
}

const envioMail = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "El email es requerido" })
    } else {
        try {
            const response = await userCollention.findOne({ typeUser: 1, email: email });
            if (response === null) return res.status(404).json({ message: "El usuario no existe" });

            const payload = {
                id: response.id
            };

            const jwtToken = jwt.sign(payload, process.env.LLAVE, {
                expiresIn: '24h'
            })

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_AUTOMATICO,
                    pass: process.env.EMAIL_CONTRASENA
                }
            });

            let mailOptions = {
                from: process.env.EMAIL_AUTOMATICO,
                to: email,
                subject: 'Restablecimiento de contraseña',
                text: `Hola ${response.name},\n`+
                `Se ha solicitado un cambio de contraseña.\n \n`+
                `Si no lo has solicitado, ignora este mensaje.\n \n`+
                `De lo contrario, haga clic en este enlace para cambiar su contraseña: http://localhost:3000/restablecer/${jwtToken}`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  res.status(400).json({ message: "Ocurrio un error al enviar email", resultado: error })
                } else {
                  console.log('Email sent: ' + info.response);
                  res.status(200).json({ message: "Usuario obtenido con exito y envio de email"})
                }
              });

            

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ocurrio un error al obtener el usuario", resultado: e })
        }
    }

    console.log(email);
}

const restablecerPass = async (req, res) => {
    const {password} = req.body;
    const token = req.headers["authorization"];
    let id;
    
    if (!token) {
        return res.status(401).json({ message: "datos faltantes" });
    }

    const jwtClient = token.split(" ")[1];

    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Invalido" });
        } else {
            id = decoded.id;
        }
    })
        const response = await userCollention.findOne({ _id: id });
        if (response === null) return res.status(404).json({ message: "El usuario no existe" });
        const encrypted_password = password != response.password ? bcrypt.hashSync(password, 10) : password;
        try {
            const result = await userCollention.updateOne({ _id: id }, { $set: { password: encrypted_password } })
            res.status(200).json({ msq: "Contraseña cambiada con exito", resultado: result })
        } catch (error) {
            res.status(500).json({ mesaage: "Ocurrio un error", error: error })
            console.error(`Ocurrio un error: ${error}`);
        }
        
}


exports.createUser = createUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.loginUser = loginUser
exports.validateToken = validateToken
exports.getUsers = getUsers
exports.getUser = getUser
exports.envioMail = envioMail
exports.restablecerPass = restablecerPass


require('dotenv').config()
const jwt = require("jsonwebtoken");

//Midleware para validar Token del usuario
const middleLogin = (req, res, next) => {
    const jwtToken = req.headers["authorization"];

    // bearer mitoken
    if (!jwtToken) {
        return res.status(401).json({ message: "No Autorizado" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Su token a expirado" });
        }

        const idUser = JSON.stringify(decoded.id);
       
        req.idUser = idUser;

        next();
    });
};

//Midleware para validar Token del administrador
const middleLoginAdmin = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    // bearer mitoken
    if (!jwtToken) {
        return res.status(401).json({ message: "No Autorizado" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Su token a expirado" });
        } 

        const typeUser = JSON.stringify(decoded.typeUser);
        if(typeUser == 1) return res.status(401).json({ message: "No Autorizado"});

        next();
    });
};

//Se exporta el Midleware para usarlo en todas las rutas
exports.middleLogin = middleLogin
exports.middleLoginAdmin = middleLoginAdmin
const mongose = require('../conexion');
require('dotenv').config();

const publications = require('./publications.controller').publications;
const comments = require('./commentsPublications.controller').comments;

const getAnalysisPublications = async (req, res) =>{

    try {
        const responsePublicacion = await publications.find({});
       
        let arrayPublications = [];
        
        for(let i = 0; i < responsePublicacion.length; i++){
            const mytest = await comments.find({ idPublication: responsePublicacion[i]._id.valueOf() });

            let acumPositive = 0;
            let acumNeutral = 0;
            let acumNegative = 0;

            for(let j = 0; j < mytest.length; j++){
                acumPositive +=  mytest[j].qualificationPositive;
                acumNeutral +=  mytest[j].qualificationNeutral;
                acumNegative +=  mytest[j].qualificationNegative;
            }

            let data = {
                publication: responsePublicacion[i],
                emotions: { 
                    positive: acumPositive/mytest.length, 
                    neutral: acumNeutral/mytest.length, 
                    negative: acumNegative/mytest.length 
                }
            }

            arrayPublications.push(data)
        }

        //console.log(arrayPublications)
        res.status(200).json({msq: "Publicaciones obtenidas con éxito", resultado: arrayPublications})
    } catch (e) {
        console.log(e)
        res.status(400).json({ msq : "Ocurrio un error al obtener las Publicaciones" ,  resultado  : e})
    }
}

exports.getAnalysisPublications = getAnalysisPublications
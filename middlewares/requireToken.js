import jwt from "jsonwebtoken"
import { tokenVerificationErrors } from "../utils/tokenManager.js";



export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        
        if (!token) throw new Error('No existe el token en el header usa Bearer');

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);

       
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
}


/*
export const requireToken = (req, res, next) => {
    try {
        let token = req.cookies.to;

        if (!token) throw new Error('No existe el token en el header usa Bearer');

        //token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);

        const TokenVerificationErros = {
            "invalid signature": "la firma de JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token invalido",
            "No Bearer": "Utiliza el formato Bearer",
            "jwt malformed": "El formato JWT no es valido",
        };

        return res
            .status(401)
            .send({ error: TokenVerificationErros[error.message] });
    }
}*/
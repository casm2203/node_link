import { validationResult } from "express-validator";

//Esto es un midelware y el next para que continue 
export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //importante mencionar el status para mostrar la informacion correcta
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
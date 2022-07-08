import axios from "axios";
import { validationResult, body, param } from "express-validator";



//Esto es un midelware y el next para que continue 
export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //importante mencionar el status para mostrar la informacion correcta
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}


export const bodyRegisterValidator = [
    //estos son metodos que se utilizan antes de que llegue al register es decir al controlador
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Minimo 6 caracteres en la contraseña").trim().isLength({ min: 6 }),
    body('password', "Formato de contraseña incorrecto").custom((value, { req }) => {
        if (value != req.body.repassword) {
            throw new Error("no coinciden las contraseñas");
        };
        return value;
    }),
    // esto hará que se ejecute el de arriba para retornar el error 
    validationResultExpress,
];

export const bodyLoginValidator = [
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Minimo 6 caracteres en la contraseña").trim().isLength({ min: 6 }),
    validationResultExpress,
];


export const bodyLinkValidator = [
    body('longLink', "Formato Link incorrecto").trim().notEmpty()
        .custom(async (value) => {
            try {
                
                if (!value.startsWith('https://')) {
                    value = 'https://' + value;
                }
               
                console.log(value);
                await axios.get(value);
                return value
            } catch (error) {
                console.log(error);
                throw new Error("not found longLink 404")
            }
        })
    , validationResultExpress,
]

export const paramLinkValidatador = [
    param("id", "Formato no valido ExpressValidator").trim().notEmpty().escape(),
    validationResultExpress,
]
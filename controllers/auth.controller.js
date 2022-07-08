import { User } from '../models/User.js';
import { generateRefreshToken, generateToken, tokenVerificationErrors } from '../utils/tokenManager.js';

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // alternativa 2 para validar el code y buscando por el email
        //let user = await User.findOne({ email });
        //if (user) throw { code: 11000 };
        // user = new User({ email, password });

        //alternativa 1
        const user = new User({ email, password });

        //jwt token

        await user.save();
        //jwt token

        const { token, expiresIn } = generateToken(user.id);

        generateRefreshToken(user.id, res);
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: !(process.env.MODO === "developer"),

        // })

        return res.status(201).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        // alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "ya existe este usuario" });
        };
        return res.status(500).json({ error: "500: Error en el servidor" });
    }
};

export const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) return res.status(403).json({ error: "No existe el usuario" });

        let resultPassword = await user.comparePassword(password);

        if (!resultPassword) return res.status(403).json({ error: "Contraseña incorrecta" });

        //Generar token
        const { token, expiresIn } = generateToken(user.id);

        generateRefreshToken(user.id, res);

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: !(process.env.MODO === "developer"),

        // })

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "500: Error en el servidor" });
    }
};

export const refreshToken = (req, res) => {
    try {

        const { token, expiresIn } = generateToken(req.uid);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "500: Error en el servidor" });
    }
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid)
        res.json({ email: user.email, id: user.id });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "500: Error en el servidor" });
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    return res.json({ ok: true });

}
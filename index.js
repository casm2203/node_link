import express from "express";
import 'dotenv/config';
//Importante colocar la extension
import './database/connectdb.js';
import cors from "cors";
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import redirectRouter from './routes/redirect.route.js';
import cookieParser from "cookie-parser";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function (origin, callback) {
        console.log(whiteList)
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback("Error de CORS Origin: " + origin + ", no autorizado!");
    }
}));

//sirve para activar el modo en que se puede recibir json desde una peticion
app.use(express.json());
//Cookies
app.use(cookieParser())
//Midelware
app.use("/api/v1/auth/", authRouter);
//Public directory
app.use(express.static("public"));
//Link
app.use("/api/v1/links/", linkRouter);
//Redirect
app.use("/", redirectRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
    console.log("flamas xD  " + PORT)
});
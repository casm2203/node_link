import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;

        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(400).json({ Error: "No existe el link" });


        return res.redirect(link.longLink);
    } catch (error) {

        console.log(error);

        if (error.kind === "ObjectId") {
            return res.status(403).json({ Error: "Formato de id incorrecto" });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

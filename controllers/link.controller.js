import { Link } from "../models/Link.js";
import { nanoid } from 'nanoid'

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });

        return res.json({ links });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

export const getLinkV1 = async (req, res) => {
    try {
        const { id } = req.params;

        const link = await Link.findById(id);

        console.log(link)

        if (!link) return res.status(400).json({ Error: "No existe el link" });

        if (!link.uid.equals(req.uid)) {
            return res.status(401).json({ Error: "No le pertenece el link 🤡" });
        }

        return res.json({ link });
    } catch (error) {

        console.log(error);

        if (error.kind === "ObjectId") {
            return res.status(403).json({ Error: "Formato de id incorrecto" });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

export const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;

        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(400).json({ Error: "No existe el link" });


        return res.json({ longLink: link.longLink });
    } catch (error) {

        console.log(error);

        if (error.kind === "ObjectId") {
            return res.status(403).json({ Error: "Formato de id incorrecto" });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

export const createLinks = async (req, res) => {
    try {

        let { longLink } = req.body;

        if (!longLink.startsWith('https://')) {
            longLink = 'https://' + longLink;
        }
        const link = new Link({
            longLink,
            nanoLink: nanoid(6),
            uid: req.uid,
        })

        const newLink = await link.save();
        console.log(longLink)
        return res.status(201).json({ link });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;

        const link = await Link.findById(id);

        console.log(link)

        if (!link) return res.status(400).json({ Error: "No existe el link" });

        if (!link.uid.equals(req.uid)) {
            return res.status(401).json({ Error: "No le pertenece el link 🤡" });
        }
        await link.remove();

        return res.json({
            link,
            response: "Se ha eliminado el link"
        });
    } catch (error) {

        console.log(error);

        if (error.kind === "ObjectId") {
            return res.status(403).json({ Error: "Formato de id incorrecto" });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
}

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;

        const { longLink } = req.body;

        if (!longLink.startsWith('https://')) {
            longLink = 'https://' + longLink;
        }

        const link = await Link.findById(id);

        if (!link) return res.status(400).json({ Error: "No existe el link" });

        if (!link.uid.equals(req.uid)) {
            return res.status(401).json({ Error: "No le pertenece el link 🤡" });
        }

        link.longLink = longLink;

        await link.save();

        return res.json({ link });
    } catch (error) {

        console.log(error);

        if (error.kind === "ObjectId") {
            return res.status(403).json({ Error: "Formato de id incorrecto" });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
}
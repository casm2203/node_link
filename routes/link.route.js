import { Router } from "express";
import { getLinks, getLink, createLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidatador } from "../middlewares/validatorManager.js";

const router = Router();

//GET       /api/v1/links             all links
//GET       /api/v1/links/:id         one link
//POST      /api/v1/links             create link
//PATCH/PUT /api/v1/links/:id         update link
//DELETE    api/v1/links/:id          delete link

router.get("/", requireToken, getLinks);
router.get("/:nanoLink", getLink);
router.post("/", requireToken, bodyLinkValidator, createLinks);
router.delete("/:id", requireToken, paramLinkValidatador, removeLink);
router.patch("/:id", requireToken, paramLinkValidatador, bodyLinkValidator, updateLink);


export default router;
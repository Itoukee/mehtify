import express from "express";
import musicController from "../controller/music.controller";
import { getMusic } from "../validator/music";

const router = express.Router();

router.get("/", musicController.getAll);
router.get("/:id", getMusic, musicController.getOne);

export default router;

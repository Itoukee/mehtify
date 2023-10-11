import { NextFunction, Request, Response } from "express";
import path from "path";
import { musics } from "../schema/musics";

const controller = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.send(musics);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const root = path.join(__dirname, "../");

      const file = musics.find((one) => one.id === parseInt(id));
      if (!file) return res.sendStatus(404);
      return res.sendFile(`/schema/static/${file.path}`, { root });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default controller;

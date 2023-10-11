import { plainToInstance } from "class-transformer";
import { IsNumber, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

class GetOneDto {
  @IsNumber()
  id!: number;
}

const getMusic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const Music = plainToInstance(GetOneDto, { id: parseInt(params.id) });
    const errors = await validate(Music);
    if (errors.length) throw errors;

    next();
  } catch (error) {
    next({ status: 400, error });
  }
};

export { getMusic };

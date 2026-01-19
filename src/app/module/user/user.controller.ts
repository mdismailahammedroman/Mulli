import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { CatchAsync } from "../../../utils/CatchAsync";

const createUserHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await UserService.createUser(payload);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const UserController = {
  createUserHandler,
};

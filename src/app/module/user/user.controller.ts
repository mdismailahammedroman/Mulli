import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;

    const result = await UserService.createUser(payload);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error); // proper error handling
  }
};

export const UserController = {
  createUserHandler,
};

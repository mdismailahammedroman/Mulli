import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { CatchAsync } from "../../../utils/CatchAsync";
import { SendResponse } from "../../../utils/SendResponse";
import { StatusCodes } from "http-status-codes";

const createUserHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await UserService.createUser(payload);

    SendResponse(res, {
      success: true,
      message: "user created successfully",
      StatusCode: StatusCodes.OK,
      data: result,
    });
  },
);

export const UserController = {
  createUserHandler,
};

import { Response } from "express";
interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface TResponse<T> {
  StatusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
}

export const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.StatusCode).json({
    StatusCode: data.StatusCode,
    success: data.message,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

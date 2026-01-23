import { Router } from "express";
import { UserRouter } from "../app/module/user/user.route";

export const router = Router();
const appRouter = [
  {
    path: "/users",
    route: UserRouter,
  },
];
appRouter.forEach((r) => {
  router.use(r.path, r.route);
});

import { Router } from "express";
import authRoute from "./authRoute";
import usersRoute from "./usersRoute";

const router = Router();

authRoute(router);
usersRoute(router);

export default router;
import { Router } from "express";
import authRoute from "./authRoute";

const router = Router();

authRoute(router);

export default router;
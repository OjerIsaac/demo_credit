import { Router } from "express";
// import { loginValidator } from "../middleware/validations/auth";
import { registerUser } from '../controllers/authController/index';

export default (router: Router) => {
    router.post("/auth/register", registerUser);
    // User Login
    router.post("/auth/login");
};
import { Router } from "express";
import { fundUserAccount } from '../controllers/userController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.post("/fund-account/:id", userAuth, fundUserAccount);
};
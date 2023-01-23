import { Router } from "express";
import { fundUserAccount } from '../controllers/userController/index';

export default (router: Router) => {
    router.post("/fund-account/:id", fundUserAccount);
};
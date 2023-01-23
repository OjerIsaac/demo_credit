import { Router } from "express";
import { fundUserAccount, userTransferFund, withdrawUserFund } from '../controllers/userController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.post("/fund-account/:id", userAuth, fundUserAccount);
    router.post("/transfer-fund/:id", userAuth, userTransferFund);
    router.post("/withdraw-fund/:id", userAuth, withdrawUserFund);
};
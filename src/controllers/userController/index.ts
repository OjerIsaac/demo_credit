import { Request, Response } from "express";
import UsersTableModel from '../../models/users';
import _ from "lodash";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";

/**
 * @description user fund account
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const fundUserAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const error: any = {};

        if (!amount) {
            error.name = "field can not be empty";
        }

        const hasErrors: boolean = Object.values(error).length >= 1;

        if (hasErrors) {
            const errorMessage = generateErrorMessage(error);
            return errorResponse(res, httpErrors.ValidationError, errorMessage);
        }

        const user = await UsersTableModel.query().findById(id);
        
        if (!user) {
            return errorResponse(res, httpErrors.AccountNotFound, "User not found");
        }

        // get user wallet balance
        const userBalance = await UsersTableModel.query().select().where('id', id)

        let newBalance = Number(userBalance[0].wallet) + Number(amount)
      
        const update = await UsersTableModel.query().update({ wallet: newBalance }).where({ id });
  
        return successResponse(res, "User account funded successfully", { newBalance });
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};

/**
 * @description user fund another user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const userTransferFund = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { amount, username } = req.body;

        const error: any = {};

        if (!amount) {
            error.name = "Amount field can not be empty";
        }

        if (!username) {
            error.name = "Username field can not be empty";
        }

        const hasErrors: boolean = Object.values(error).length >= 1;

        if (hasErrors) {
            const errorMessage = generateErrorMessage(error);
            return errorResponse(res, httpErrors.ValidationError, errorMessage);
        }

        const sender = await UsersTableModel.query().findById(id);
        
        if (!sender) {
            return errorResponse(res, httpErrors.AccountNotFound, "User not found");
        }

        const receiver = await UsersTableModel.query().select().where('username', username)
        console.log(receiver);
        
        if (receiver.length < 1) {
            return errorResponse(res, httpErrors.AccountNotFound, "User not found");
        }

        // get sender wallet balance
        const senderBalance = await UsersTableModel.query().select().where('id', id);

        // check if able to send
        if (Number(senderBalance[0].wallet) < Number(amount)) {
            return errorResponse(res, httpErrors.AccountError, "Insufficient Balance");
        }

        // debit sender
        let senderNewBalance = Number(senderBalance[0].wallet) - Number(amount)

        // fetch receiver account balance and update
        const receiverBalance = await UsersTableModel.query().select().where('username', username)

        let receiverNewBalance = Number(receiverBalance[0].wallet) + Number(amount)

        const transferToReceiver = await UsersTableModel.query().update({ wallet: receiverNewBalance }).where({ username });

        // update sender acct   
        const senderAcctUpdate = await UsersTableModel.query().update({ wallet: senderNewBalance }).where({ id });
  
        return successResponse(res, "Transfer successful", { data: { amount, senderNewBalance } });
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};
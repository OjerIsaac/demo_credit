import { Request, Response } from "express";
import UsersTableModel from '../../models/users';
import _ from "lodash";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";

/**
 * @description register a new user
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
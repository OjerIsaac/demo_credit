import { Request, Response } from "express";
import { User} from '../../models/users';
import _ from "lodash";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";

/**
 * @description register a new user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { full_name, username, email, password } = req.body;

        const error: any = {};

        if (!full_name) {
            error.name = "Name field can not be empty";
        }

        if (!username) {
            error.name = "Username can not be empty";
        }

        if (!email) {
            error.name = "Email can not be empty";
        }

        if (!password) {
            error.name = "Password can not be empty";
        }

        const hasErrors: boolean = Object.values(error).length >= 1;

        if (hasErrors) {
            const errorMessage = generateErrorMessage(error);
            return errorResponse(res, httpErrors.ValidationError, errorMessage);
        }
  
        // check for duplicates
        const userExists = await User.query().select().where('email', email)
        // .debug();
      
        if(userExists.length > 0) {
            return errorResponse(res, httpErrors.AccountExists, "This user already exists.")
        }
  
        // create new user
        const hash = await bcrypt.hash(password, 10);
        const wallet = 0; // default balance all users
        const newUser = {
            full_name: full_name,
            username: username,
            email: email,
            wallet: wallet,
            password: hash
        };
      
        await User.query().insert(newUser);
  
        return successResponse(res, "User created successfully", { });
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};
import { Request, Response } from "express";
import UsersTableModel from '../../models/users';
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
        const emailExists = await UsersTableModel.query().select().where('email', email)
        // .debug();
        const usernameExists = await UsersTableModel.query().select().where('username', username)
      
        if(emailExists.length > 0) {
            return errorResponse(res, httpErrors.AccountExists, "User with this email already exists.")
        }

        if(usernameExists.length > 0) {
            return errorResponse(res, httpErrors.AccountExists, "This username is already taken.")
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
      
        await UsersTableModel.query().insert(newUser);
  
        return successResponse(res, "User created successfully", { });
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};

/**
 * @description login user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        // find user in db
        const user = await UsersTableModel.query().select().where('username', username)
        // console.log(user[0].full_name)

        if(user.length < 1) {
            return errorResponse(res, httpErrors.AccountNotFound, "Invalid Username.")
        }

        // check password validity
        let passwordCorrect = await bcrypt.compare(password, user[0].password);
  
        if (!passwordCorrect) {
            return errorResponse(res, httpErrors.AccountError, "Invalid password.");
        }

        let name = user[0].full_name;

        // create and assign token
        // const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // return successResponse(res, { token });
  
        return successResponse(res, "Login successful", { data: {
            name
        }});
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};
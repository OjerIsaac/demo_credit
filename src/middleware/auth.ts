import jwt from "../utils/lib/jwt";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/lib/response";
import httpErrors from "../utils/constants/httpErrors";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let header = req.get("Authorization") as string;
  if (!/^Bearer (.+)$/i.test(header)) {
    // Bearer token is not present
    return errorResponse(res, httpErrors.InvalidToken, "Authorization token is required");
  }

  // Extract user ID from bearer token
  let token = (/^Bearer (.+)$/i.exec(header) as string[])[1].trim();
  let userDetails = jwt.verifyAccessToken(token);

  if (!userDetails) {
    // Invalid Bearer token
    return errorResponse(
      res,
      httpErrors.InvalidToken,
      "Invalid authentication token"
    );
  }

  let { name } = userDetails;

  // Pass the user id to the request and execute subsequent requests
  req.app.set("userDetails", { name });
  next();
};
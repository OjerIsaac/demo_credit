import { Response } from 'express';

export interface ISuccessResponse {
    success: true,
    message: string,
    payload: {
        [key: string]: any
    }
}

export interface IErrorResponse {
    success: false,
    error: {
        type: string,
        message: string | Array<Object>
    }
}

export const successResponse = (res: Response, message: string, payload?: any): Response<ISuccessResponse> => {
    return res.status(200).json({
        success: true,
        message,
        payload: { ...payload }
    })
}

export const errorResponse = (res: Response, error: any, message: any): Response<IErrorResponse> => {
    let errorCode = error.code || 401;
    return res.status(errorCode).json({
        success: false,
        error: {
            type: error.type,
            message: message
        }
    })
}
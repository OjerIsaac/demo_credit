interface IErrors {
    NotFoundError: {
        [key: string]: string|number
    },
    ValidationError: {
        [key: string]: string|number
    },
    ServerError: {
        [key: string]: string|number
    },
    InvalidParameter: {
        [key: string]: string|number
    },
    AccountNotFound: {
        [key: string]: string|number
    },
    AccountExists: {
        [key: string]: string|number
    },
    AccountError: {
        [key: string]: string|number
    },
    InvalidToken: {
        [key: string]: string|number
    }
}

const httpErrors: IErrors = {
    NotFoundError: {
        type: 'NotFoundError',
        code: 404
    },
    ValidationError: {
        type: 'ValidationError',
        code: 400
    },
    ServerError: {
        type: 'ServerError',
        code: 500
    },
    InvalidParameter: {
        type: 'InvalidParameter',
        code: 400
    },
    AccountNotFound: {
        type: 'AccountNotFound',
        code: 400
    },
    AccountExists: {
        type: 'AccountExists',
        code: 409
    },
    AccountError: {
        type: 'AccountError',
        code: 400
    },
    InvalidToken: {
        type: 'InvalidToken',
        code: 401
    }
}

export default httpErrors;
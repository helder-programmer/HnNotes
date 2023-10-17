export class ApiError extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401)
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400)
    }
}
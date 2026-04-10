export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestException extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}

export class NotFoundException extends AppError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export class InternalServerException extends AppError {
    constructor(message: string = "Internal Server Error") {
        super(message, 500);
    }
}

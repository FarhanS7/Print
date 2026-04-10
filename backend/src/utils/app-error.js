export class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequestException extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
export class NotFoundException extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
export class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
export class InternalServerException extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}
//# sourceMappingURL=app-error.js.map
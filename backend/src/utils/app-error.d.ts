export declare class AppError extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class BadRequestException extends AppError {
    constructor(message?: string);
}
export declare class NotFoundException extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedException extends AppError {
    constructor(message?: string);
}
export declare class InternalServerException extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=app-error.d.ts.map
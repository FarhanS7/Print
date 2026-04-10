import mongoose from 'mongoose';
export declare const User: mongoose.Model<{
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
}, mongoose.Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    email: string;
    emailVerified: boolean;
    role: "user" | "admin";
    image?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Session: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    expiresAt: NativeDate;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Account: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: NativeDate | null;
    refreshTokenExpiresAt?: NativeDate | null;
    scope?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Verification: mongoose.Model<{
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
}, mongoose.Document<unknown, {}, {
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    value: string;
    expiresAt: NativeDate;
    identifier: string;
    createdAt?: NativeDate | null;
    updatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=user.model.d.ts.map
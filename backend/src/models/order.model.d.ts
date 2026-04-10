import mongoose from 'mongoose';
export declare const Order: mongoose.Model<{
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    designId: mongoose.Types.ObjectId;
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "shipped" | "cancelled";
    stripeSessionId?: string | null;
    shippingAddress?: {
        line1?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    } | null;
    customerEmail?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=order.model.d.ts.map
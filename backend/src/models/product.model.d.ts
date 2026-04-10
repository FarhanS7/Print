import mongoose from 'mongoose';
export declare const Product: mongoose.Model<{
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    basePrice: number;
    image: string;
    sizes: string[];
    colors: mongoose.Types.DocumentArray<{
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }, {}, {}> & {
        hex?: string | null;
        name?: string | null;
        image?: string | null;
    }>;
    description?: string | null;
    category?: string | null;
    printableArea?: {
        top?: number | null;
        left?: number | null;
        width?: number | null;
        height?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Design: mongoose.Model<{
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
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
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    productId: mongoose.Types.ObjectId;
    artworkUrl: string;
    userId: mongoose.Types.ObjectId;
    artworkPlacement?: {
        x?: number | null;
        y?: number | null;
        scale?: number | null;
        rotation?: number | null;
    } | null;
    title?: string | null;
    price?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=product.model.d.ts.map
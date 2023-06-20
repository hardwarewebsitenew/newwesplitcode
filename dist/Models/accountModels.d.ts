import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    complete: string;
    platformname: string;
    slots: number;
    price: number;
    catagory: string;
    joinedemail: string;
    password: string;
    joineduser: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    complete: string;
    platformname: string;
    slots: number;
    price: number;
    catagory: string;
    joinedemail: string;
    password: string;
    joineduser: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    }[];
}>>;
export default _default;

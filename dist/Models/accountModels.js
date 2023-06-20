"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const accountschema = new mongoose.Schema({
    platformname: { type: String, required: true },
    slots: { type: Number, required: true },
    price: { type: Number, required: true },
    catagory: { type: String, required: true },
    joinedemail: { type: String, default: '' },
    password: { type: String, default: '' },
    complete: { type: String, required: true, default: 'False' },
    joineduser: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
});
exports.default = (0, mongoose_1.model)('accounts', accountschema);

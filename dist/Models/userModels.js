"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    wallet: { type: Number, required: true, default: 0 },
    profile_pic_url: { type: String, required: false },
    verified: { type: Boolean, required: true, default: false },
    verification_token: { type: Number, required: true },
    verification_token_time: { type: Date, required: true },
    reset_password_token: { type: Number, required: false },
    reset_password_token_time: { type: Date, required: false },
    username: { type: String, required: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    role: { type: String, required: true, default: 'User' }
});
exports.default = (0, mongoose_1.model)('users', userSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uservalidatos = void 0;
const express_validator_1 = require("express-validator");
const userModels_1 = require("../Models/userModels");
class uservalidatos {
    static signup() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return userModels_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('password', 'Password is Reuired').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password can be from 8-20 charaters'),
            (0, express_validator_1.body)('username', 'Username is Required').isString()];
    }
    static login() {
        return [(0, express_validator_1.body)('email', 'Email is Required').custom((email, { req }) => {
                return userModels_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('Email Not Found');
                    }
                });
            }),
            (0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric()];
    }
    static verify() {
        return [(0, express_validator_1.body)('verification_token', 'verification token is Required').isNumeric()];
    }
    static updatepassword() {
        return [(0, express_validator_1.body)('password', 'password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('new_password', 'new Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('confirm_password', 'confirm password is Required').isAlphanumeric().custom((confirm_password, { req }) => {
                if (confirm_password === req.body.new_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password Does not Match');
                }
            })];
    }
    static profilepicupdate() {
        return [(0, express_validator_1.body)('profile_pic').custom((profile_pic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File Not Uploded');
                }
            })];
    }
    static resetPassword() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return userModels_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), (0, express_validator_1.body)('new_password', 'New Password is Required').isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error('Confirm Password and new Password Does not Match');
                }
            }),
            (0, express_validator_1.body)('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('reset_password_token', 'Reset Password Token').isNumeric()
                .custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid.Please Try Again');
                }
            })];
    }
    static sendResetPasswordEmail() {
        return [(0, express_validator_1.query)('email', 'Email is Required').isEmail()
                .custom((email) => {
                return userModels_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email Does not Exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        return [(0, express_validator_1.query)('reset_password_token', 'Reset Password Token is Required')
                .isNumeric().custom((token, { req }) => {
                return userModels_1.default.findOne({
                    reset_password_token: token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                });
            })];
    }
}
exports.uservalidatos = uservalidatos;

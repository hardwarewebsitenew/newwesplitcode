"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usercontroller = void 0;
const userModels_1 = require("../Models/userModels");
const utils_1 = require("../Utils/utils");
const jwt = require("jsonwebtoken");
const nodeMailer_1 = require("../Utils/nodeMailer");
class usercontroller {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const pass = req.body.password;
            const usernamee = req.body.username;
            const verifytkn = utils_1.utils.generateverficationtoken();
            try {
                const encypass = yield utils_1.utils.encryptpassword(pass);
                const data = {
                    email: email,
                    password: encypass,
                    username: usernamee,
                    verification_token: verifytkn,
                    verification_token_time: Date.now() + new utils_1.utils().MAX_TOKEN_TIME
                };
                const signups = yield new userModels_1.default(data).save();
                res.send(signups);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const pass = req.body.password;
            const userdet = req.user;
            try {
                yield utils_1.utils.comparepasswords({ plainpasswords: pass, encrptedpassword: userdet.password });
                const token = jwt.sign({ email: userdet.email, user_id: userdet._id, role: userdet.role }, 'secret', { expiresIn: '120d' });
                res.json({ status: 'Success', token: token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifcationsendemail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailuser = req.body.email;
            const verifytkn = utils_1.utils.generateverficationtoken();
            try {
                const uservk = yield userModels_1.default.findOneAndUpdate({ email: emailuser }, { verification_token: verifytkn, verification_token_time: Date.now() + new utils_1.utils().MAX_TOKEN_TIME });
                if (uservk) {
                    const mailer = yield nodeMailer_1.Nodemailer.sendemail({
                        to: [uservk.email], subject: 'Email Verification',
                        html: `<h1>${verifytkn}</h1>`
                    });
                    res.json({ success: true });
                }
                else {
                    throw new Error('User does not exist');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = req.body.verification_token;
            const email = req.user.email;
            try {
                const very = yield userModels_1.default.findOneAndUpdate({ email: email, verification_token: tokens }, { verified: true, updated_at: new Date() }, { new: true });
                if (very) {
                    res.send(very);
                }
                else {
                    throw new Error('Verification Token is expired');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updatepassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmpass = req.body.confirm_password;
            const password = req.body.password;
            const userid = req.user.user_id;
            try {
                const user = yield userModels_1.default.findOne({ _id: userid });
                yield utils_1.utils.comparepasswords({ plainpasswords: password, encrptedpassword: user.password });
                const ecntypass = yield utils_1.utils.encryptpassword(confirmpass);
                const newuserpass = yield userModels_1.default.findOneAndUpdate({ _id: userid }, { password: ecntypass }, { new: true });
                res.send(newuserpass);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const newPassword = req.body.new_password;
            try {
                const encryptedPassword = yield utils_1.utils.encryptpassword(newPassword);
                const updatedUser = yield userModels_1.default.findOneAndUpdate({ _id: user._id }, {
                    updated_at: new Date(),
                    password: encryptedPassword
                }, { new: true });
                res.send(updatedUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static sendResetPasswordEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const resetPasswordToken = utils_1.utils.generateverficationtoken();
            try {
                const updatedUser = yield userModels_1.default.findOneAndUpdate({ email: email }, {
                    updated_at: new Date(), reset_password_token: resetPasswordToken,
                    reset_password_token_time: Date.now() + new utils_1.utils().MAX_TOKEN_TIME
                }, { new: true });
                res.send(updatedUser);
                yield nodeMailer_1.Nodemailer.sendemail({
                    to: [email], subject: 'Reset Password Email',
                    html: `<h1>${resetPasswordToken}</h1>`
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyResetPasswordToken(req, res, next) {
        res.json({
            success: true
        });
    }
    static profilepicupdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const fileUrl = 'http://localhost:5000/' + req.file.path;
            try {
                const user = yield userModels_1.default.findOneAndUpdate({ _id: userId }, {
                    updated_at: new Date(),
                    profile_pic_url: fileUrl
                }, { new: true });
                res.send('added');
            }
            catch (error) {
                next(error);
            }
        });
    }
    static wallet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.user.user_id;
            try {
                const uk = yield userModels_1.default.findOne({ _id: userid }, 'wallet');
                res.send(uk);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getprofile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.user.user_id;
            try {
                const uks = yield userModels_1.default.findOne({ _id: userid });
                res.send(uks);
            }
            catch (error) {
            }
        });
    }
}
exports.usercontroller = usercontroller;

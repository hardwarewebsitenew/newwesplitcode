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
exports.utils = void 0;
const Bcrypt = require("bcrypt");
const Multer = require("multer");
const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class utils {
    constructor() {
        this.MAX_TOKEN_TIME = 60000;
        this.upload = Multer({ storage: storage, fileFilter: fileFilter });
    }
    static encryptpassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, ((err, hash) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            })));
        });
    }
    static rolechecker(role) {
        return new Promise((resolve, reject) => {
            if (role === "Admin") {
                resolve(true);
            }
            else {
                reject(new Error("Your Not Admin"));
            }
        });
    }
    static comparepasswords(passwords) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(passwords.plainpasswords, passwords.encrptedpassword, (err, isinvalid) => {
                if (err) {
                    reject(err);
                }
                else if (!isinvalid) {
                    reject(new Error("Email & Password doesn't match"));
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static generateverficationtoken(size = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
}
exports.utils = utils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalcheckerror = void 0;
const express_validator_1 = require("express-validator");
const jwt = require("jsonwebtoken");
class globalcheckerror {
    static checkerror(req, res, next) {
        const errdel = (0, express_validator_1.validationResult)(req);
        if (!errdel.isEmpty()) {
            console.log(errdel.array()[0].msg);
            next(new Error(errdel.array()[0].msg));
        }
        else {
            next();
        }
    }
    static authenticate(req, res, next) {
        const authkey = req.headers.authorization;
        const token = authkey ? authkey.slice(7, authkey.length) : null;
        try {
            jwt.verify(token, 'secret', (eerr, decoded) => {
                if (eerr) {
                    next(eerr);
                }
                else if (!decoded) {
                    next(new Error('User Not Authorised'));
                }
                else {
                    req.user = decoded;
                    next();
                }
            });
        }
        catch (error) {
        }
    }
}
exports.globalcheckerror = globalcheckerror;

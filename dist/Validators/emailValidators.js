"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidatos = void 0;
const express_validator_1 = require("express-validator");
const accountModels_1 = require("../Models/accountModels");
class emailValidatos {
    static inbox() {
        return [(0, express_validator_1.query)('email', 'email is Required').isEmail().custom((email, { req }) => {
                const userid = req.user.user_id;
                console.log(userid);
                console.log(userid);
                return accountModels_1.default.find({ $and: [{ joineduser: { $all: [userid] } }, { joinedemail: email }] }, ['platformname', 'joinedemail', 'password']).then((data) => {
                    const ct = Object.keys(data).length;
                    console.log(ct);
                    if (ct > 0) {
                        req.account = data;
                        return true;
                    }
                    else {
                        throw new Error('No Email Exist');
                    }
                });
            })];
    }
}
exports.emailValidatos = emailValidatos;

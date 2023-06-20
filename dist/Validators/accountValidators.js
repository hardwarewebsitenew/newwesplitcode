"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountvalidatos = void 0;
const express_validator_1 = require("express-validator");
const accountModels_1 = require("../Models/accountModels");
class accountvalidatos {
    static accountbyid() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return accountModels_1.default.find({ $and: [{ platformname: id }, { complete: 'False' }] }).then((accounts) => {
                    if (accounts) {
                        req.account = accounts;
                        return true;
                    }
                    else {
                        throw new Error('No Account exist');
                    }
                });
            })];
    }
    static accountbycategory() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return accountModels_1.default.find({ $and: [{ catagory: id }, { complete: 'False' }] }).then((accounts) => {
                    if (accounts) {
                        req.account = accounts;
                        return true;
                    }
                    else {
                        throw new Error('No Account exist');
                    }
                });
            })];
    }
    static joinuser() {
        return [(0, express_validator_1.body)('accountid', 'account id is required').custom((accountid, { req }) => {
                return accountModels_1.default.findOne({ _id: accountid }).then((account) => {
                    if (account) {
                        req.account = account;
                        return true;
                    }
                    else {
                        throw new Error("No Platform Exist");
                    }
                });
            })];
    }
}
exports.accountvalidatos = accountvalidatos;

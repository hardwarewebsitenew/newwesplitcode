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
exports.accountcontroller = void 0;
const accountModels_1 = require("../Models/accountModels");
const userModels_1 = require("../Models/userModels");
class accountcontroller {
    static accountbyid(req, res, next) {
        res.send(req.account);
    }
    static accountbycategory(req, res, next) {
        res.send(req.account);
    }
    static joinuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountid = req.account._id;
            const userid = req.user.user_id;
            const email = req.user.email;
            const slots = req.account.slots;
            const price = req.account.price;
            const countslots = req.account.joineduser;
            const ct = Object.keys(countslots).length;
            const user = yield userModels_1.default.findOne({ email: email });
            console.log(countslots);
            if (countslots.includes(userid)) {
                res.json({ status: 'User Already Joined' });
            }
            else {
                if (ct < slots) {
                    if (price <= user.wallet) {
                        const updatewallet = user.wallet - price;
                        yield userModels_1.default.findOneAndUpdate({ _id: userid }, { wallet: updatewallet }, { new: true });
                        const yash = yield accountModels_1.default.findOneAndUpdate({ _id: accountid }, { $push: { "joineduser": userid } }, { new: true });
                        res.json({ status: 'User Joined' });
                    }
                    else {
                        res.json({ status: 'insufficient balance' });
                    }
                }
                else {
                    res.json({ status: 'Slots Not available' });
                }
            }
        });
    }
}
exports.accountcontroller = accountcontroller;

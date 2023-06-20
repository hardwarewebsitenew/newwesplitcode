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
exports.adminController = void 0;
const accountModels_1 = require("../Models/accountModels");
const utils_1 = require("../Utils/utils");
class adminController {
    static accountgenerate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const platform = req.body.platformname;
            const slot = req.body.slots;
            const prices = req.body.price;
            const catagorys = req.body.catagory;
            const userinfo = req.user;
            try {
                const accdata = {
                    platformname: platform,
                    slots: slot,
                    price: prices,
                    catagory: catagorys
                };
                yield utils_1.utils.rolechecker(userinfo.role);
                const acc = yield new accountModels_1.default(accdata).save();
                res.send(acc);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.adminController = adminController;

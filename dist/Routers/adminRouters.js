"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../Controllers/adminController");
const CheckErrorMiddleWare_1 = require("../middlewares/CheckErrorMiddleWare");
const adminValidators_1 = require("../Validators/adminValidators");
class adminrouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/accounts/generate', CheckErrorMiddleWare_1.globalcheckerror.authenticate, adminValidators_1.adminValidators.accountvalidators(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, adminController_1.adminController.accountgenerate);
    }
    putRoutes() {
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new adminrouters().router;

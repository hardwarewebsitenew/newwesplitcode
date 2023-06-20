"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../Controllers/emailController");
const CheckErrorMiddleWare_1 = require("../middlewares/CheckErrorMiddleWare");
const emailValidators_1 = require("../Validators/emailValidators");
class emailrouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/inbox', CheckErrorMiddleWare_1.globalcheckerror.authenticate, emailValidators_1.emailValidatos.inbox(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, emailController_1.emailcontroller.emailbyid);
        this.router.get('/getemailbyuser', CheckErrorMiddleWare_1.globalcheckerror.authenticate, emailController_1.emailcontroller.getemailbyuser);
    }
    postRoutes() {
    }
    putRoutes() {
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new emailrouters().router;

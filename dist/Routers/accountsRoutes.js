"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../Controllers/accountController");
const CheckErrorMiddleWare_1 = require("../middlewares/CheckErrorMiddleWare");
const accountValidators_1 = require("../Validators/accountValidators");
class accountrouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/platform/:id', CheckErrorMiddleWare_1.globalcheckerror.authenticate, accountValidators_1.accountvalidatos.accountbyid(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, accountController_1.accountcontroller.accountbyid);
        this.router.get('/category/:id', CheckErrorMiddleWare_1.globalcheckerror.authenticate, accountValidators_1.accountvalidatos.accountbycategory(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, accountController_1.accountcontroller.accountbycategory);
    }
    postRoutes() {
        this.router.post('/join', CheckErrorMiddleWare_1.globalcheckerror.authenticate, accountValidators_1.accountvalidatos.joinuser(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, accountController_1.accountcontroller.joinuser);
    }
    putRoutes() {
    }
    patchRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new accountrouters().router;

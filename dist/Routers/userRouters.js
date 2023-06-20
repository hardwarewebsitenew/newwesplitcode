"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const CheckErrorMiddleWare_1 = require("../middlewares/CheckErrorMiddleWare");
const utils_1 = require("../Utils/utils");
const userValidators_1 = require("../Validators/userValidators");
class userRouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRouters();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', CheckErrorMiddleWare_1.globalcheckerror.authenticate, userController_1.usercontroller.verifcationsendemail);
        this.router.get('/reset/password', userValidators_1.uservalidatos.sendResetPasswordEmail(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', userValidators_1.uservalidatos.verifyResetPasswordToken(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.verifyResetPasswordToken);
        this.router.get('/wallet', CheckErrorMiddleWare_1.globalcheckerror.authenticate, userController_1.usercontroller.wallet);
        this.router.get('/getprofile', CheckErrorMiddleWare_1.globalcheckerror.authenticate, userController_1.usercontroller.getprofile);
    }
    postRouters() {
        this.router.post('/signup', userValidators_1.uservalidatos.signup(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.signup);
        this.router.post('/login', userValidators_1.uservalidatos.login(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.login);
    }
    patchRoutes() {
        this.router.patch('/verify', CheckErrorMiddleWare_1.globalcheckerror.authenticate, userValidators_1.uservalidatos.verify(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.verify);
        this.router.patch('/update/password', CheckErrorMiddleWare_1.globalcheckerror.authenticate, userValidators_1.uservalidatos.updatepassword(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.updatepassword);
        this.router.patch('/reset/password', userValidators_1.uservalidatos.resetPassword(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.resetPassword);
        this.router.patch('/update/profilepic', CheckErrorMiddleWare_1.globalcheckerror.authenticate, new utils_1.utils().upload.single('profile_pic'), userValidators_1.uservalidatos.profilepicupdate(), CheckErrorMiddleWare_1.globalcheckerror.checkerror, userController_1.usercontroller.profilepicupdate);
    }
    putRoutes() {
    }
    deleteRoutes() {
    }
}
exports.default = new userRouters().router;

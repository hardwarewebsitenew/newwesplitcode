import { Router } from "express";
import { usercontroller } from "../Controllers/userController";
import { globalcheckerror } from "../middlewares/CheckErrorMiddleWare";
import { utils } from "../Utils/utils";
import { uservalidatos } from "../Validators/userValidators";

 class userRouters {
    public router:Router;

    constructor(){
        this.router = Router();

        this.getRoutes();
        this.postRouters();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/send/verification/email', globalcheckerror.authenticate, usercontroller.verifcationsendemail)
        this.router.get('/reset/password', uservalidatos.sendResetPasswordEmail(), globalcheckerror.checkerror,
            usercontroller.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', uservalidatos.verifyResetPasswordToken(), globalcheckerror.checkerror,
        usercontroller.verifyResetPasswordToken);
        this.router.get('/wallet', globalcheckerror.authenticate, usercontroller.wallet)
        this.router.get('/getprofile', globalcheckerror.authenticate, usercontroller.getprofile)

    }

    postRouters(){
        this.router.post('/signup',uservalidatos.signup(), globalcheckerror.checkerror, usercontroller.signup);
        this.router.post('/login',uservalidatos.login(), globalcheckerror.checkerror, usercontroller.login)

    }

    patchRoutes(){
        this.router.patch('/verify', globalcheckerror.authenticate, uservalidatos.verify(), globalcheckerror.checkerror, usercontroller.verify)
        this.router.patch('/update/password', globalcheckerror.authenticate, uservalidatos.updatepassword(), globalcheckerror.checkerror, usercontroller.updatepassword)
        this.router.patch('/reset/password', uservalidatos.resetPassword(), globalcheckerror.checkerror, usercontroller.resetPassword);
        this.router.patch('/update/profilepic',globalcheckerror.authenticate, new utils().upload.single('profile_pic'), uservalidatos.profilepicupdate(), globalcheckerror.checkerror, usercontroller.profilepicupdate)
    }

    putRoutes(){

    }

    deleteRoutes(){

    }



}

export default new userRouters().router;
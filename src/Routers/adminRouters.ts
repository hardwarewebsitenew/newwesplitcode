import { Router } from "express";
import { adminController } from "../Controllers/adminController";
import { globalcheckerror } from "../middlewares/CheckErrorMiddleWare";
import { adminValidators } from "../Validators/adminValidators";
import { uservalidatos } from "../Validators/userValidators";

class adminrouters {
    public router:Router;

    constructor(){
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){

    }

    postRoutes(){
        this.router.post('/accounts/generate',globalcheckerror.authenticate, adminValidators.accountvalidators(), globalcheckerror.checkerror, adminController.accountgenerate)


    }

    putRoutes(){

    }

    patchRoutes(){

    }

    deleteRoutes(){

    }

}
export default new adminrouters().router;
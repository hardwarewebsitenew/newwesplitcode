import { Router } from "express";
import { emailcontroller } from "../Controllers/emailController";
import { globalcheckerror } from "../middlewares/CheckErrorMiddleWare";
import { emailValidatos } from "../Validators/emailValidators";


class emailrouters {
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
        this.router.get('/inbox', globalcheckerror.authenticate, emailValidatos.inbox(), globalcheckerror.checkerror, emailcontroller.emailbyid);
        this.router.get('/getemailbyuser', globalcheckerror.authenticate, emailcontroller.getemailbyuser)

      
    }

    postRoutes(){
       
    }

    putRoutes(){

    }

    patchRoutes(){
        

    }

    deleteRoutes(){

    }

}
export default new emailrouters().router;
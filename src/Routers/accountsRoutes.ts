import { Router } from "express";
import { accountcontroller } from "../Controllers/accountController";
import { adminController } from "../Controllers/adminController";
import { globalcheckerror } from "../middlewares/CheckErrorMiddleWare";
import { accountvalidatos } from "../Validators/accountValidators";
import { adminValidators } from "../Validators/adminValidators";
import { uservalidatos } from "../Validators/userValidators";

class accountrouters {
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
        this.router.get('/platform/:id',globalcheckerror.authenticate, accountvalidatos.accountbyid(), globalcheckerror.checkerror, accountcontroller.accountbyid)
        this.router.get('/category/:id', globalcheckerror.authenticate, accountvalidatos.accountbycategory(), globalcheckerror.checkerror, accountcontroller.accountbycategory)
        
    }

    postRoutes(){
        this.router.post('/join',globalcheckerror.authenticate, accountvalidatos.joinuser(), globalcheckerror.checkerror, accountcontroller.joinuser)

        
    }

    putRoutes(){
     
    }

    patchRoutes(){
        

    }

    deleteRoutes(){

    }

}
export default new accountrouters().router;
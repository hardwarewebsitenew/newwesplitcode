import { body } from "express-validator";

export class adminValidators {
    static accountvalidators(){
       return [body('platformname','Platformname is Required').isString(),
    body('slots','Slots are Required').isNumeric(),
    body('price','Price is Required').isString(),
    body('catagory','Catogory is Required').isString(),
     ]
    }

}
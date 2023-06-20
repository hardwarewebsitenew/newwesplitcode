import { body, param } from "express-validator";
import accountModels from "../Models/accountModels";

export class accountvalidatos{
    static accountbyid(){
        return [param('id').custom((id,{req}) => {
            return accountModels.find({$and: [{platformname: id}, {complete: 'False'}]}).then((accounts)=>
            {
                if(accounts)
                {
                    req.account = accounts;
                    return true;

                }
                else
                {
                    throw new Error('No Account exist')
                }

            })
        })]
    }

    static accountbycategory(){
        return [param('id').custom((id,{req}) => {
            return accountModels.find({$and: [{catagory: id}, {complete: 'False'}]}).then((accounts)=>
            {
                if(accounts)
                {
                    req.account = accounts;
                    return true;

                }
                else
                {
                    throw new Error('No Account exist')
                }

            })
        })]
    }

    static joinuser(){
        return [body('accountid','account id is required').custom((accountid, {req}) => {
               return accountModels.findOne({_id: accountid}).then((account) => {
                  if(account)
                  {
                    req.account = account;
                    return true
                  }
                  else
                  {
                    throw new Error("No Platform Exist")

                  }
               })
        })]
    }
}
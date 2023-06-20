import accountModels from "../Models/accountModels";
import userModels from "../Models/userModels";

export class accountcontroller{
    static accountbyid(req, res, next){
        res.send(req.account)

    }

    static accountbycategory(req, res, next){
        res.send(req.account)

    }

    static async joinuser(req, res, next){
        const accountid = req.account._id;
        const userid = req.user.user_id;
        const email = req.user.email;
        const slots = req.account.slots;
        const price = req.account.price;
        const countslots = req.account.joineduser
        const ct =  Object.keys(countslots).length;
        

        const user:any = await userModels.findOne({email: email})
        
        console.log(countslots)
        

        if(countslots.includes(userid))
        {
        
            res.json({status: 'User Already Joined'})
              
        }
        else
        {
            if (ct < slots)
            {
            if(price <= user.wallet)
            {
               const updatewallet =  user.wallet - price;

               await userModels.findOneAndUpdate({_id: userid}, {wallet: updatewallet}, {new: true})

               const yash =  await accountModels.findOneAndUpdate({_id: accountid},{$push:{"joineduser": userid}}, {new: true})
               res.json({status: 'User Joined'})
            }
            else
            {
                res.json({status: 'insufficient balance'})
                
            }

            }
            else
            {
                res.json({status: 'Slots Not available'})
            
            }
           
         }
        
        


       


    }

}
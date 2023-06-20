import accountModels from "../Models/accountModels";
import { utils } from "../Utils/utils";

export class adminController{
    static async accountgenerate(req, res, next){
        const platform = req.body.platformname;
        const slot = req.body.slots;
        const prices = req.body.price;
        const catagorys = req.body.catagory;
        const userinfo = req.user;
        


        try {
            const accdata = {
                platformname: platform,
                slots: slot,
                price: prices,
                catagory: catagorys
            }
            await utils.rolechecker(userinfo.role)
            const acc = await new accountModels(accdata).save()
            res.send(acc)

            
        } catch (error) {
            next(error)
        }


    }
}
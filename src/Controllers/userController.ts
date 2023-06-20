import userModels from "../Models/userModels";
import { utils } from "../Utils/utils";
import * as jwt from "jsonwebtoken";
import { Nodemailer } from "../Utils/nodeMailer";


export class usercontroller {
    static async signup(req, res, next){
        const email = req.body.email;
        const pass = req.body.password;
        const usernamee = req.body.username;

        const verifytkn = utils.generateverficationtoken()
        
        try {
            const encypass = await utils.encryptpassword(pass);

            const data = {
                email: email,
                password: encypass,
                username: usernamee,
                verification_token: verifytkn,
                verification_token_time: Date.now() + new utils().MAX_TOKEN_TIME
            }
            
            const signups = await new userModels(data).save();
            res.send(signups)
            
        } catch (error) {
            next(error)
        }
        

        
        

    }

    static async login(req, res, next){
        const email = req.body.email;
        const pass = req.body.password;
        const userdet = req.user;

        try {
           await utils.comparepasswords({plainpasswords: pass, encrptedpassword: userdet.password})
           const token = jwt.sign({email: userdet.email, user_id: userdet._id, role: userdet.role}, 'secret', {expiresIn: '120d'})
           res.json({status: 'Success',token: token})

        } 
        catch (error) {
            next(error)
        }

    }

    static async verifcationsendemail(req, res, next){
        const emailuser = req.body.email;

        const verifytkn = utils.generateverficationtoken();

        try {
           const uservk = await userModels.findOneAndUpdate({email:emailuser},{verification_token: verifytkn, verification_token_time: Date.now() + new utils().MAX_TOKEN_TIME})

           if(uservk)
           {
             const mailer = await Nodemailer.sendemail({
                to: [uservk.email], subject: 'Email Verification',
                html: `<h1>${verifytkn}</h1>`
             });
             res.json({success: true})
           }
           else
           {
            throw new Error('User does not exist')
           }



        } catch (error) {
            next(error)
        }

    }

    static async verify(req, res, next)
    {
        const tokens = req.body.verification_token;
        const email = req.user.email;

        try {
            
           const very = await userModels.findOneAndUpdate({email:email, verification_token: tokens},
            {verified: true, updated_at: new Date()}, {new: true});

            if(very)
            {
             res.send(very);
            }
            else
          {
              throw new Error('Verification Token is expired'); 
          }

        } catch (error) {
            next(error)
        }

    }

    static async updatepassword(req, res, next){
        const confirmpass = req.body.confirm_password;
        const password = req.body.password;
        const userid = req.user.user_id;

        try {

           const user:any = await userModels.findOne({_id:userid})

           await utils.comparepasswords({plainpasswords:password, encrptedpassword: user.password})
           const ecntypass = await utils.encryptpassword(confirmpass)

           const newuserpass = await userModels.findOneAndUpdate({_id:userid},{password: ecntypass},{new: true})

           res.send(newuserpass)
            
        } catch (error) {

            next(error)
            
        }
    }

    static async resetPassword(req, res, next) {
        const user = req.user;
        const newPassword = req.body.new_password;
        try {
            const encryptedPassword = await utils.encryptpassword(newPassword);
            const updatedUser = await userModels.findOneAndUpdate({_id: user._id}, {
                updated_at: new Date(),
                password: encryptedPassword
            }, {new: true});
            res.send(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    static async sendResetPasswordEmail(req, res, next) {
        const email = req.query.email;
        const resetPasswordToken = utils.generateverficationtoken();
        try {
            const updatedUser = await userModels.findOneAndUpdate({email: email},
                {
                    updated_at: new Date(), reset_password_token: resetPasswordToken,
                    reset_password_token_time: Date.now() + new utils().MAX_TOKEN_TIME
                }, {new: true});
            res.send(updatedUser);
            await Nodemailer.sendemail({
                to: [email], subject: 'Reset Password Email',
                html: `<h1>${resetPasswordToken}</h1>`
            })
        } catch (e) {
            next(e);
        }
    }

    static verifyResetPasswordToken(req, res, next) {
        res.json({
            success: true
        })
    }

    static async profilepicupdate(req, res, next)
    {
        const userId = req.user.user_id;

        const fileUrl = 'http://localhost:5000/' + req.file.path;

        try {
            const user = await userModels.findOneAndUpdate({_id: userId}, {
                updated_at: new Date(),
                profile_pic_url: fileUrl
            },{new: true})

            
            res.send('added')
        } catch (error) {
            next(error)
        }

    }

    static async wallet(req, res, next){
        const userid = req.user.user_id;
        try {
           const uk = await userModels.findOne({_id: userid}, 'wallet')
           res.send(uk)
           
            
        } catch (error) {
            next(error)
        }

    }

    static async getprofile(req, res, next){
        const userid = req.user.user_id;
        try {
            const uks = await userModels.findOne({_id: userid})
            res.send(uks)
        } catch (error) {
            
        }

    }
    

}
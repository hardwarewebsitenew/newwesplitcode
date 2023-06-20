import {body, query} from 'express-validator';
import userModels from '../Models/userModels';
import { Nodemailer } from '../Utils/nodeMailer';
import { utils } from '../Utils/utils';

export class uservalidatos{
    static signup(){
        return [body('email','Email is Required').isEmail().custom((email,{req})=> {
           return userModels.findOne({email:email}).then((user)=> {
                if(user)
                {
                   throw new Error('User Already Exist');
                }
                else
                {
                    return true;
                }
            })
        }),
        body('password','Password is Reuired').isAlphanumeric().isLength({min: 8, max: 20}).withMessage('Password can be from 8-20 charaters'),
        body('username','Username is Required').isString()]

    }

    static login(){
        return[body('email','Email is Required').custom((email,{req})=> {
           return userModels.findOne({email:email}).then((user)=> {
                if(user)
                {
                    req.user = user;
                    return true;
                }
                else
                {
                throw new Error('Email Not Found')
                }
            })
        }),
    body('password','Password is Required').isAlphanumeric()]
    }

    static verify(){
        return [body('verification_token','verification token is Required').isNumeric()]
    }

    static updatepassword(){
        return [body('password','password is Required').isAlphanumeric(),
        body('new_password','new Password is Required').isAlphanumeric(),
        body('confirm_password','confirm password is Required').isAlphanumeric().custom((confirm_password,{req}) => {
      if(confirm_password === req.body.new_password)
      {
        return true;
      }
      else
      {
        req.errorStatus = 422;
        throw new Error('Password and Confirm Password Does not Match');
      }
})]
    }

    static profilepicupdate(){
        return[body('profile_pic').custom((profile_pic,{req}) => {
              if(req.file)
              {
                return true
              }
              else
              {
                throw new Error('File Not Uploded')
              }
        })]
    }

    static resetPassword() {
        return [body('email', 'Email is Required').isEmail().custom((email, {req}) => {
            return userModels.findOne({email: email}).then(user => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw  new Error('User Does Not Exist');
                }
            });
        }), body('new_password', 'New Password is Required').isAlphanumeric().custom((newPassword, {req}) => {
            if (newPassword === req.body.confirm_password) {
                return true;
            } else {
                throw new Error('Confirm Password and new Password Does not Match');
            }
        }),
            body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            body('reset_password_token', 'Reset Password Token').isNumeric()
                .custom((token, {req}) => {
                    if (Number(req.user.reset_password_token) === Number(token)) {
                        return true
                    } else {
                        req.errorStatus = 422;
                        throw  new Error('Reset Password Token is Invalid.Please Try Again');
                    }
                })]
    }

    static sendResetPasswordEmail() {
        return [query('email', 'Email is Required').isEmail()
            .custom((email) => {
                return userModels.findOne({email: email}).then((user) => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Email Does not Exist');
                    }
                })
            })];
    }

    static verifyResetPasswordToken() {
        return [query('reset_password_token', 'Reset Password Token is Required')
            .isNumeric().custom((token, {req}) => {
                return userModels.findOne({
                    reset_password_token: token,
                    reset_password_token_time: {$gt: Date.now()}
                }).then((user) => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                })
            })]
    }

   
} 
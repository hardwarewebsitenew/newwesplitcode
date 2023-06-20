import {body, query} from 'express-validator';
import accountModels from '../Models/accountModels';
import userModels from '../Models/userModels';

export class emailValidatos
{
  static inbox(){
    return[query('email','email is Required').isEmail().custom((email, {req}) => {
          const userid = req.user.user_id;
          console.log(userid)
          console.log(userid)
          return accountModels.find({$and: [{joineduser: { $all : [userid]}}, {joinedemail: email }]}, ['platformname','joinedemail', 'password']).then((data)=> {
            const ct =  Object.keys(data).length;
            console.log(ct)
            if (ct > 0 ) {
                req.account = data;
                return true;
            } else {
                throw  new Error('No Email Exist');
            }
          })
    })]
  }
}
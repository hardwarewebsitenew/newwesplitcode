import * as Bcrypt from "bcrypt";
import * as Multer from 'multer';

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
      cb(null, true);
    }
    else
    {
      cb(null, false);
    }
}

export class utils{

    public MAX_TOKEN_TIME = 60000;
    public upload = Multer({ storage: storage, fileFilter: fileFilter})
    
    static encryptpassword(password: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (async (err, hash) => {
               if(err)
               {
                   reject(err);
                   
               }
               else
               {
                   resolve(hash);
               }

              
       }));

       })
    }

    static rolechecker(role:string){
      return new Promise((resolve, reject)=> {
         if(role==="Admin")
         {
          resolve(true)
         }
         else
         {
          reject(new Error("Your Not Admin"))
         }

      })

    }

    static comparepasswords(passwords:{plainpasswords: string, encrptedpassword: string}){
        return new Promise((resolve, reject) => {
            Bcrypt.compare(passwords.plainpasswords,passwords.encrptedpassword, (err, isinvalid) => {
                if(err)
                {
                  reject(err)
                }
                else if(!isinvalid)
                {
                  reject(new Error("Email & Password doesn't match"))
                }
                else
                {
                    resolve(true)
                }

            })

        })

    }

    static generateverficationtoken(size: number = 5){
        let digits = '0123456789'
        let otp = '';
        for(let i=0;i < size; i++){
            otp += digits[Math.floor(Math.random() * 10)]

        }

        return parseInt(otp)



    }

}
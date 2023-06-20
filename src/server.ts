import bodyParser = require('body-parser');
import * as express from 'express';
import mongoose, * as mongo from 'mongoose';
import accountsRoutes from './Routers/accountsRoutes';
import adminRouters from './Routers/adminRouters';
import userRouters from './Routers/userRouters';
import emailrouters from './Routers/emailRoutes';
import * as cors from 'cors';

export class Server {

    corsOptions: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: '*',
        preflightContinue: false
    };
     
    public app: express.Application = express();

    constructor(){
        this.setConfigurations();
        this.setRouters();
        this.errorhandler404();
        this.errorhandles();
        

    }

    

    setConfigurations(){
        this.setMongodb();
        this.configureBodyparser();
        this.app.use('*', cors(this.corsOptions));
    
    }

   

    setMongodb(){
        mongoose.connect('mongodb+srv://mysteriouscoder:mysteriouscoder@cluster0.agkearu.mongodb.net/?retryWrites=true&w=majority').then(()=>{
            console.log("Connected")
        })
    }

    configureBodyparser(){
      this.app.use(bodyParser.urlencoded({extended: true}))
      this.app.use(bodyParser.json());

    }

    setRouters(){
       this.app.use('/api/user', userRouters)
       this.app.use('/api/admin', adminRouters)
       this.app.use('/api/accounts', accountsRoutes)
       this.app.use('/api/email', emailrouters)
     

    }

    errorhandler404(){
        this.app.use((req, res)=> {
          res.status(404).json({"message":"Not Found","status_code":"404"});
        })

    }

    errorhandles(){
        this.app.use((error,req,res,next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
             message: error.message || "Something went Wrong",
             status_code: errorStatus
            })
         })

    }



}
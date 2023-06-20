import * as express from 'express';
import * as cors from 'cors';
export declare class Server {
    corsOptions: cors.CorsOptions;
    app: express.Application;
    constructor();
    setConfigurations(): void;
    setMongodb(): void;
    configureBodyparser(): void;
    setRouters(): void;
    errorhandler404(): void;
    errorhandles(): void;
}

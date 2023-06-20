"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose_1 = require("mongoose");
const accountsRoutes_1 = require("./Routers/accountsRoutes");
const adminRouters_1 = require("./Routers/adminRouters");
const userRouters_1 = require("./Routers/userRouters");
const emailRoutes_1 = require("./Routers/emailRoutes");
const cors = require("cors");
class Server {
    constructor() {
        this.corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };
        this.app = express();
        this.setConfigurations();
        this.setRouters();
        this.errorhandler404();
        this.errorhandles();
    }
    setConfigurations() {
        this.setMongodb();
        this.configureBodyparser();
        this.app.use('*', cors(this.corsOptions));
    }
    setMongodb() {
        mongoose_1.default.connect('mongodb+srv://mysteriouscoder:mysteriouscoder@cluster0.agkearu.mongodb.net/?retryWrites=true&w=majority').then(() => {
            console.log("Connected");
        });
    }
    configureBodyparser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    setRouters() {
        this.app.use('/api/user', userRouters_1.default);
        this.app.use('/api/admin', adminRouters_1.default);
        this.app.use('/api/accounts', accountsRoutes_1.default);
        this.app.use('/api/email', emailRoutes_1.default);
    }
    errorhandler404() {
        this.app.use((req, res) => {
            res.status(404).json({ "message": "Not Found", "status_code": "404" });
        });
    }
    errorhandles() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went Wrong",
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;

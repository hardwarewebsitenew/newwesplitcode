"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodemailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class Nodemailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendemail(data) {
        return Nodemailer.initializeTransport().sendMail({ from: 'yash28rock9911@gmail.com', to: data.to, subject: data.subject, html: data.html });
    }
}
exports.Nodemailer = Nodemailer;

import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class Nodemailer{
    static initializeTransport(){
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    static sendemail(data: {to:[string], subject:string, html: string}): Promise<any>{
       return Nodemailer.initializeTransport().sendMail({from: 'yash28rock9911@gmail.com', to: data.to, subject: data.subject, html: data.html})
    }

}
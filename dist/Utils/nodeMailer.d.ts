export declare class Nodemailer {
    static initializeTransport(): any;
    static sendemail(data: {
        to: [string];
        subject: string;
        html: string;
    }): Promise<any>;
}

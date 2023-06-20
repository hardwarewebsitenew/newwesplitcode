export declare class usercontroller {
    static signup(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static verifcationsendemail(req: any, res: any, next: any): Promise<void>;
    static verify(req: any, res: any, next: any): Promise<void>;
    static updatepassword(req: any, res: any, next: any): Promise<void>;
    static resetPassword(req: any, res: any, next: any): Promise<void>;
    static sendResetPasswordEmail(req: any, res: any, next: any): Promise<void>;
    static verifyResetPasswordToken(req: any, res: any, next: any): void;
    static profilepicupdate(req: any, res: any, next: any): Promise<void>;
    static wallet(req: any, res: any, next: any): Promise<void>;
    static getprofile(req: any, res: any, next: any): Promise<void>;
}

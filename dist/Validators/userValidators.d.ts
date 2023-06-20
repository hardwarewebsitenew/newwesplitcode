export declare class uservalidatos {
    static signup(): import("express-validator").ValidationChain[];
    static login(): import("express-validator").ValidationChain[];
    static verify(): import("express-validator").ValidationChain[];
    static updatepassword(): import("express-validator").ValidationChain[];
    static profilepicupdate(): import("express-validator").ValidationChain[];
    static resetPassword(): import("express-validator").ValidationChain[];
    static sendResetPasswordEmail(): import("express-validator").ValidationChain[];
    static verifyResetPasswordToken(): import("express-validator").ValidationChain[];
}

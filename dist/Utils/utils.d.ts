export declare class utils {
    MAX_TOKEN_TIME: number;
    upload: any;
    static encryptpassword(password: string): Promise<any>;
    static rolechecker(role: string): Promise<unknown>;
    static comparepasswords(passwords: {
        plainpasswords: string;
        encrptedpassword: string;
    }): Promise<unknown>;
    static generateverficationtoken(size?: number): number;
}

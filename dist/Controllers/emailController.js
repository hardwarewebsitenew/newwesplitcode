"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailcontroller = void 0;
const Imap = require("imap");
const mailparser_1 = require("mailparser");
const accountModels_1 = require("../Models/accountModels");
class emailcontroller {
    static emailbyid(req, res, next) {
        const email = req.account[0].joinedemail;
        const password = req.account[0].password;
        let jsonArrayObject = [];
        const imapConfig = {
            user: email,
            password: password,
            host: 'mail.wesplit.in',
            port: 143,
        };
        const getEmails = () => {
            try {
                const imap = new Imap(imapConfig);
                imap.once('ready', () => {
                    imap.openBox('INBOX', false, () => {
                        // ['BEFORE', new Date()]
                        imap.search(['ALL'], (err, results) => {
                            const len = results.length;
                            console.log(len);
                            if (len > 0) {
                                for (let i = 0; i < len; i++) {
                                    const f = imap.fetch(results[i], { bodies: '' });
                                    f.on('message', msg => {
                                        msg.on('body', stream => {
                                            (0, mailparser_1.simpleParser)(stream, (err, parsed) => __awaiter(this, void 0, void 0, function* () {
                                                // console.log(parsed)
                                                // const {from, subject, textAsHtml, text} = parsed;
                                                const from = parsed.from.text;
                                                const subject = parsed.subject;
                                                const text = parsed.text;
                                                const textAsHtml = parsed.html;
                                                console.log(parsed);
                                                const contend = {
                                                    "from": from,
                                                    "subject": subject,
                                                    "text": text,
                                                    "textAsHtml": textAsHtml
                                                };
                                                jsonArrayObject.push(contend);
                                                // console.log(jsonArrayObject)
                                                //  console.log(".")
                                                /* Make API call to save the data
                                                   Save the retrieved data into a database.
                                                   E.t.c
                                                */
                                            }));
                                        });
                                        msg.once('attributes', attrs => {
                                            const { uid } = attrs;
                                            imap.addFlags(uid, ['\\Seen'], () => {
                                                // Mark the email as read after reading it
                                                console.log('Marked as read!');
                                            });
                                        });
                                    });
                                    f.once('error', ex => {
                                        console.log(ex);
                                        return Promise.reject(ex);
                                    });
                                    f.once('end', () => {
                                        console.log('Done fetching all messages!');
                                        imap.end();
                                    });
                                }
                            }
                            else {
                                res.send("No Emails Found");
                            }
                        });
                    });
                });
                imap.once('error', err => {
                    console.log(err);
                });
                imap.once('end', () => {
                    console.log('Connection ended');
                    res.json(jsonArrayObject);
                });
                imap.connect();
            }
            catch (ex) {
                console.log('an error occurred');
            }
        };
        getEmails();
    }
    static getemailbyuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.user.user_id;
            const emils = yield accountModels_1.default.find({ $and: [{ joineduser: { $all: [userid] } }, { joinedemail: { $ne: "" } }] }, ['joinedemail', 'platformname']);
            res.send(emils);
        });
    }
}
exports.emailcontroller = emailcontroller;

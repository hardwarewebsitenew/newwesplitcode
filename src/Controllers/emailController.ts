import * as Imap from 'imap';
import {simpleParser} from 'mailparser';
import accountModels from '../Models/accountModels';



export class emailcontroller{
    
    static emailbyid(req, res, next){
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
                    if(len > 0)
                    {
                      for (let i = 0; i < len; i++){
                        const f = imap.fetch(results[i], {bodies: ''});
                        f.on('message', msg => {
                          msg.on('body', stream => {
                            simpleParser(stream, async (err, parsed) => {
                              // console.log(parsed)
                              // const {from, subject, textAsHtml, text} = parsed;
                             
                             const from = parsed.from.text;
                             const subject = parsed.subject;
                             const text = parsed.text;
                             const textAsHtml = parsed.html;

                             console.log(parsed)
                             const contend = {
                                   "from": from,
                                   "subject": subject,
                                   "text": text,
                                   "textAsHtml": textAsHtml
                                   
                              }
                              jsonArrayObject.push(contend)
                             // console.log(jsonArrayObject)
                              
                              
                        
                            //  console.log(".")
                              /* Make API call to save the data
                                 Save the retrieved data into a database.
                                 E.t.c
                              */
                            });
                          });
                          
                          msg.once('attributes', attrs => {
                            const {uid} = attrs;
                            imap.addFlags(uid, ['\\Seen'], () => {
                              // Mark the email as read after reading it
                              console.log('Marked as read!');
                            });
                          });
                        });
                        f.once('error', ex => {
                          console.log(ex)
                          return Promise.reject(ex);
                        });
                        f.once('end', () => {
                          console.log('Done fetching all messages!');
                          imap.end();
                        });
                      }   
                    }
                    else
                    {
                      res.send("No Emails Found")
                    }
                   
                  });
                  
                });
              });
          
              imap.once('error', err => {
                
                console.log(err);

              });
          
              imap.once('end', () => {
                console.log('Connection ended');
                res.json(jsonArrayObject)
              });
              
              imap.connect();
              
            } catch (ex) {
              
              console.log('an error occurred');
            }
          };
          
          getEmails();
        
    }

    static async getemailbyuser(req, res, next){
      const userid = req.user.user_id;
      
       const emils = await accountModels.find({$and: [{joineduser: { $all : [userid]}}, {joinedemail: {$ne : ""} }]}, ['joinedemail', 'platformname'])
       res.send(emils)


    }
    

}
import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const accountschema = new mongoose.Schema({
    platformname: {type: String, required: true},
    slots: {type: Number, required: true},
    price: {type: Number, required: true},
    catagory: {type: String, required: true},
    joinedemail: {type: String, default: ''},
    password: {type: String, default: ''},
    complete: {type: String, required: true, default: 'False'},
    joineduser: [{type: mongoose.Types.ObjectId, ref: 'users'}]

})

export default model('accounts', accountschema)   

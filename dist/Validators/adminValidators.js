"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidators = void 0;
const express_validator_1 = require("express-validator");
class adminValidators {
    static accountvalidators() {
        return [(0, express_validator_1.body)('platformname', 'Platformname is Required').isString(),
            (0, express_validator_1.body)('slots', 'Slots are Required').isNumeric(),
            (0, express_validator_1.body)('price', 'Price is Required').isString(),
            (0, express_validator_1.body)('catagory', 'Catogory is Required').isString(),
        ];
    }
}
exports.adminValidators = adminValidators;

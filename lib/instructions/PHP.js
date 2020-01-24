"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
function PHP(state, _a) {
    var pushByte = _a.pushByte;
    pushByte(Utils_1.getSR(state, true));
    return state;
}
exports.default = PHP;
;

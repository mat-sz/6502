"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
function PLP(state, _a) {
    var popByte = _a.popByte;
    return Utils_1.setSR(state, popByte());
}
exports.default = PLP;
;

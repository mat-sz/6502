"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
function RTI(state, _a) {
    var popByte = _a.popByte, popWord = _a.popWord;
    state = Utils_1.setSR(state, popByte());
    state.PC = popWord() - 1; // 1 is added later on from the byte count of the instruction
    return state;
}
exports.default = RTI;
;

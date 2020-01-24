"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BRK(state, _a) {
    var performIRQ = _a.performIRQ;
    state.PC += 2;
    performIRQ(0xFFFE, true);
    return state;
}
exports.default = BRK;
;

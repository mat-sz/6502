"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BEQ(state, _a) {
    var address = _a.address;
    if (state.ZF) {
        state.PC = address;
    }
    return state;
}
exports.default = BEQ;
;

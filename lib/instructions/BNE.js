"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BNE(state, _a) {
    var address = _a.address;
    if (!state.ZF) {
        state.PC = address;
    }
    return state;
}
exports.default = BNE;
;

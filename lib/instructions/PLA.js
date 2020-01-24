"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PLA(state, _a) {
    var popByte = _a.popByte;
    state.A = popByte();
    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;
    return state;
}
exports.default = PLA;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TXA(state) {
    state.A = state.X;
    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;
    return state;
}
exports.default = TXA;
;

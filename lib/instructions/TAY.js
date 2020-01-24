"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TAY(state) {
    state.Y = state.A;
    state.ZF = (state.Y & 0xFF) === 0x00;
    state.NF = (state.Y & 0x80) === 0x80;
    return state;
}
exports.default = TAY;
;

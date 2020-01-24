"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function INX(state) {
    state.X++;
    state.ZF = (state.X & 0xFF) === 0x00;
    state.NF = (state.X & 0x80) === 0x80;
    return state;
}
exports.default = INX;
;
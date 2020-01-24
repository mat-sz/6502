"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CMP(state, _a) {
    var operand = _a.operand;
    var value = state.A - operand;
    state.CF = state.A >= operand;
    state.ZF = state.A === operand;
    state.NF = (value & 0x80) === 0x80;
    return state;
}
exports.default = CMP;
;

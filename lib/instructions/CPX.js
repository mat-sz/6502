"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CPX(state, _a) {
    var operand = _a.operand;
    var value = state.X - operand;
    state.CF = state.X >= operand;
    state.ZF = state.X === operand;
    state.NF = (value & 0x80) === 0x80;
    return state;
}
exports.default = CPX;
;

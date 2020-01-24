"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CPY(state, _a) {
    var operand = _a.operand;
    var value = state.Y - operand;
    state.CF = state.Y >= operand;
    state.ZF = state.Y === operand;
    state.NF = (value & 0x80) === 0x80;
    return state;
}
exports.default = CPY;
;

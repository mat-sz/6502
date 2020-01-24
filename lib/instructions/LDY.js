"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LDY(state, _a) {
    var operand = _a.operand;
    state.Y = operand;
    state.ZF = (state.Y & 0xFF) === 0x00;
    state.NF = (state.Y & 0x80) === 0x80;
    return state;
}
exports.default = LDY;
;

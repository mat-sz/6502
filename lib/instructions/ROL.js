"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ROL(state, _a) {
    var operand = _a.operand, setOperand = _a.setOperand;
    var value = operand << 1;
    if (state.CF)
        value = value | 0x01;
    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;
    state.CF = operand >= 0x80;
    setOperand(value);
    return state;
}
exports.default = ROL;
;

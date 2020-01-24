"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ASL(state, _a) {
    var operand = _a.operand, setOperand = _a.setOperand;
    state.CF = operand >= 0x80;
    var value = operand << 1;
    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;
    setOperand(value);
    return state;
}
exports.default = ASL;
;

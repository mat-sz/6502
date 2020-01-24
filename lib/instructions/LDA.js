"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LDA(state, _a) {
    var operand = _a.operand;
    state.A = operand;
    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;
    return state;
}
exports.default = LDA;
;

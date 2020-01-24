"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function JSR(state, _a) {
    var address = _a.address, pushWord = _a.pushWord;
    pushWord(state.PC + 2);
    state.PC = address;
    return state;
}
exports.default = JSR;
;

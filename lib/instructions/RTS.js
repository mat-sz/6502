"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RTS(state, _a) {
    var popWord = _a.popWord;
    state.PC = popWord();
    return state;
}
exports.default = RTS;
;

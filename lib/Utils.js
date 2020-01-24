"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressMode;
(function (AddressMode) {
    AddressMode[AddressMode["ACCUMULATOR"] = 0] = "ACCUMULATOR";
    AddressMode[AddressMode["ABSOLUTE"] = 1] = "ABSOLUTE";
    AddressMode[AddressMode["ABSOLUTE_X"] = 2] = "ABSOLUTE_X";
    AddressMode[AddressMode["ABSOLUTE_Y"] = 3] = "ABSOLUTE_Y";
    AddressMode[AddressMode["IMMEDIATE"] = 4] = "IMMEDIATE";
    AddressMode[AddressMode["IMPLIED"] = 5] = "IMPLIED";
    AddressMode[AddressMode["INDIRECT"] = 6] = "INDIRECT";
    AddressMode[AddressMode["INDIRECT_X"] = 7] = "INDIRECT_X";
    AddressMode[AddressMode["INDIRECT_Y"] = 8] = "INDIRECT_Y";
    AddressMode[AddressMode["RELATIVE"] = 9] = "RELATIVE";
    AddressMode[AddressMode["ZEROPAGE"] = 10] = "ZEROPAGE";
    AddressMode[AddressMode["ZEROPAGE_X"] = 11] = "ZEROPAGE_X";
    AddressMode[AddressMode["ZEROPAGE_Y"] = 12] = "ZEROPAGE_Y";
})(AddressMode = exports.AddressMode || (exports.AddressMode = {}));
;
;
;
var getWord = function (state, getMemory, offset) { return ((getMemory(offset + 1) << 8 | getMemory(offset)) & 0xFFFF); };
var getImmediateWord = function (state, getMemory) { return getWord(state, getMemory, state.PC + 1); };
var getImmediateByte = function (state, getMemory) { return getMemory(state.PC + 1); };
var getAddress = function (state, getMemory, mode) {
    switch (mode) {
        case AddressMode.ABSOLUTE:
            return getImmediateWord(state, getMemory);
        case AddressMode.ABSOLUTE_X:
            return getImmediateWord(state, getMemory) + state.X;
        case AddressMode.ABSOLUTE_Y:
            return getImmediateWord(state, getMemory) + state.Y;
        case AddressMode.INDIRECT:
            return getWord(state, getMemory, getImmediateWord(state, getMemory));
        case AddressMode.INDIRECT_X:
            return getWord(state, getMemory, (getImmediateByte(state, getMemory) + state.X) & 0xFF);
        case AddressMode.INDIRECT_Y:
            return getWord(state, getMemory, getImmediateByte(state, getMemory)) + state.Y;
        case AddressMode.RELATIVE:
            var value = getImmediateByte(state, getMemory);
            if (value >= 0x80) {
                value -= 0x100;
            }
            return state.PC + value;
        case AddressMode.ZEROPAGE:
            return getImmediateByte(state, getMemory);
        case AddressMode.ZEROPAGE_X:
            return (getImmediateByte(state, getMemory) + state.X) & 0xff;
        case AddressMode.ZEROPAGE_Y:
            return (getImmediateByte(state, getMemory) + state.Y) & 0xff;
        default:
            // TODO: Return null instead (or fix createInstruction).
            return 0;
    }
};
var getOperand = function (state, getMemory, mode) {
    switch (mode) {
        case AddressMode.ACCUMULATOR:
            return state.A;
        case AddressMode.ABSOLUTE:
        case AddressMode.ABSOLUTE_X:
        case AddressMode.ABSOLUTE_Y:
        case AddressMode.INDIRECT:
        case AddressMode.INDIRECT_X:
        case AddressMode.INDIRECT_Y:
        case AddressMode.RELATIVE:
        case AddressMode.ZEROPAGE:
        case AddressMode.ZEROPAGE_X:
        case AddressMode.ZEROPAGE_Y:
            return getMemory(getAddress(state, getMemory, mode));
        case AddressMode.IMMEDIATE:
            return getImmediateByte(state, getMemory);
        case AddressMode.IMPLIED:
            return 0;
        default:
            // TODO: Return null instead (or fix createInstruction).
            return 0;
    }
};
var setOperand = function (state, getMemory, setMemory, mode, value) {
    switch (mode) {
        case AddressMode.ACCUMULATOR:
            state.A = value;
            break;
        case AddressMode.ABSOLUTE:
        case AddressMode.ABSOLUTE_X:
        case AddressMode.ABSOLUTE_Y:
        case AddressMode.INDIRECT_X:
        case AddressMode.INDIRECT_Y:
        case AddressMode.ZEROPAGE:
        case AddressMode.ZEROPAGE_X:
        case AddressMode.ZEROPAGE_Y:
            setMemory(getAddress(state, getMemory, mode), value);
            break;
        default:
            throw new Error('Incorrect address mode');
    }
    return state;
};
exports.createInstruction = function (fn, addressMode, bytes, cycles) {
    return {
        addressMode: addressMode,
        bytes: bytes,
        cycles: cycles,
        name: fn.name ? fn.name : 'XYZ',
        fn: function (state, getMemory, setMemory) {
            state.A = state.A & 0xFF;
            state.X = state.X & 0xFF;
            state.Y = state.Y & 0xFF;
            state.SP = state.SP & 0xFF;
            var result = fn(state, {
                address: getAddress(state, getMemory, addressMode),
                operand: getOperand(state, getMemory, addressMode),
                setOperand: function (value) { return setOperand(state, getMemory, setMemory, addressMode, value); },
                pushByte: function (value) { return exports.pushByte(state, setMemory, value); },
                pushWord: function (value) { return exports.pushWord(state, setMemory, value); },
                popByte: function () { return exports.popByte(state, getMemory); },
                popWord: function () { return exports.popWord(state, getMemory); },
                performIRQ: function (offset, brk) {
                    if (brk === void 0) { brk = false; }
                    return exports.performIRQ(state, getMemory, setMemory, offset, brk);
                },
            });
            result.PC += bytes;
            result.cycles += cycles;
            return result;
        }
    };
};
// Processor status
exports.getSR = function (state, brk) {
    if (brk === void 0) { brk = false; }
    var value = 0;
    if (state.NF)
        value = value | 0x80;
    if (state.VF)
        value = value | 0x40;
    value = value | 0x20; // Always true
    if (brk)
        value = value | 0x10;
    if (state.DF)
        value = value | 0x08;
    if (state.IF)
        value = value | 0x04;
    if (state.ZF)
        value = value | 0x02;
    if (state.CF)
        value = value | 0x01;
    return value;
};
exports.setSR = function (state, value) {
    state.NF = (value & 0x80) === 0x80;
    state.VF = (value & 0x40) === 0x40;
    state.DF = (value & 0x08) === 0x08;
    state.IF = (value & 0x04) === 0x04;
    state.ZF = (value & 0x02) === 0x02;
    state.CF = (value & 0x01) === 0x01;
    return state;
};
// Stack management
exports.pushByte = function (state, setMemory, value) {
    setMemory(0x0100 | state.SP, value);
    state.SP--;
    return state;
};
exports.pushWord = function (state, setMemory, value) {
    setMemory(0x0100 | state.SP, value >> 8);
    setMemory(0x0100 | (state.SP - 1), value & 0xff);
    state.SP -= 2;
    return state;
};
exports.popByte = function (state, getMemory) {
    state.SP++;
    return getMemory(0x0100 | state.SP);
};
exports.popWord = function (state, getMemory) {
    state.SP += 2;
    return (getMemory(0x0100 | state.SP) << 8) | (getMemory(0x0100 | (state.SP - 1)) & 0xFFFF);
};
// IRQ
exports.performIRQ = function (state, getMemory, setMemory, offset, brk) {
    if (brk === void 0) { brk = false; }
    exports.pushWord(state, setMemory, state.PC);
    exports.pushByte(state, setMemory, exports.getSR(state, brk));
    state.IF = true;
    state.PC = getWord(state, getMemory, offset);
    return state;
};
// Decimal Mode
exports.decodeBCD = function (operand) { return (operand >> 4) * 10 + (operand & 0x0F); };
exports.encodeBCD = function (value) { return (Math.floor(value / 10) << 4) + (value % 10); };

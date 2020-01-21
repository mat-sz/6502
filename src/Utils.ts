import { State } from '.';

export enum AddressMode {
    ACCUMULATOR, // Operand is A
    ABSOLUTE,    // Operand is address $HHLL
    ABSOLUTE_X,  // Operand is address incremented by X with carry
    ABSOLUTE_Y,  // Operand is address incremented by Y with carry
    IMMEDIATE,   // Operand is byte BB
    IMPLIED,     // Operand implied
    INDIRECT,    // Operand is address from the contents of a word at the given address; C.w($HHLL)
    INDIRECT_X,  // Operand is zeropage address; C.w($00LL + X)
    INDIRECT_Y,  // Operand is zeropage address; C.w($00LL) + Y
    RELATIVE,    // Branch target is PC + signed offset BB
    ZEROPAGE,    // Operand is zeropage address $00LL
    ZEROPAGE_X,  // Operand is zeropage address incremented by X without carry
    ZEROPAGE_Y,  // Operand is zeropage address incremented by Y without carry
};

// Pure functions for state changes to make debugging easier.
export type InstructionFunction = (state: State) => State;

export interface Instruction {
    addressMode: AddressMode,
    bytes: number,
    fn: InstructionFunction,
    name: string,
};

const getWord = (state: State, offset: number) => ((state.memory[offset + 1] << 8 | state.memory[offset]) & 0xFFFF);
const getImmediateWord = (state: State) => getWord(state, state.PC + 1);
const getImmediateByte = (state: State) => state.memory[state.PC + 1];

const getAddress = (state: State, mode: AddressMode) => {
    switch (mode) {
        case AddressMode.ABSOLUTE:
            return getImmediateWord(state);
        case AddressMode.ABSOLUTE_X:
            return getImmediateWord(state) + state.X;
        case AddressMode.ABSOLUTE_Y:
            return getImmediateWord(state) + state.Y;
        case AddressMode.INDIRECT:
            return getWord(state, getImmediateWord(state));
        case AddressMode.INDIRECT_X:
            return getWord(state, (getImmediateByte(state) + state.X) & 0xFF);
        case AddressMode.INDIRECT_Y:
            return getWord(state, getImmediateByte(state)) + state.Y;
        case AddressMode.RELATIVE:
            let value = getImmediateByte(state);
            if (value >= 0x80) {
                value -= 0x100;
            }
            
            return state.PC + value;
        case AddressMode.ZEROPAGE:
            return getImmediateByte(state);
        case AddressMode.ZEROPAGE_X:
            return (getImmediateByte(state) + state.X) & 0xff;
        case AddressMode.ZEROPAGE_Y:
            return (getImmediateByte(state) + state.Y) & 0xff;
        default:
            throw new Error('Incorrect address mode');
    }
};

const getOperand = (state: State, mode: AddressMode) => {
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
            return state.memory[getAddress(state, mode)];
        case AddressMode.IMMEDIATE:
            return getImmediateByte(state);
        case AddressMode.IMPLIED:
            return 0;
        default:
            throw new Error('Incorrect address mode');
    }
};

const setOperand = (state: State, mode: AddressMode, value: number) => {
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
            state.memory[getAddress(state, mode)] = value;
            break;
        default:
            throw new Error('Incorrect address mode');
    }

    return state;
};

export const createInstruction = (
    fn: (state: State, operand: number, setOperand: (value: number) => State) => State,
    addressMode: AddressMode, bytes: number, useAddress = false) => {

    return {
        addressMode: addressMode,
        bytes: bytes,
        name: (fn as any).name ? (fn as any).name : 'XYZ',
        fn: (state: State) => {
            state.A = state.A & 0xFF;
            state.X = state.X & 0xFF;
            state.Y = state.Y & 0xFF;
            state.SP = state.SP & 0xFF;
            
            const operand = useAddress ? getAddress(state, addressMode) : getOperand(state, addressMode);
            
            const result = fn(state, operand, (value: number) => setOperand(state, addressMode, value));
            result.PC += bytes;
            
            return result;
        }
    } as Instruction;
};

// Processor status
export const getSR = (state: State, brk = false) => {
    let value = 0;
    if (state.NF) value = value | 0x80;
    if (state.VF) value = value | 0x40;
    value = value | 0x20; // Always true
    if (brk) value = value | 0x10;
    if (state.DF) value = value | 0x08;
    if (state.IF) value = value | 0x04;
    if (state.ZF) value = value | 0x02;
    if (state.CF) value = value | 0x01;

    return value;
};

export const setSR = (state: State, value: number) => {
    state.NF = (value & 0x80) === 0x80;
    state.VF = (value & 0x40) === 0x40;
    state.DF = (value & 0x08) === 0x08;
    state.IF = (value & 0x04) === 0x04;
    state.ZF = (value & 0x02) === 0x02;
    state.CF = (value & 0x01) === 0x01;

    return state;
};

// Stack management
export const pushByte = (state: State, value: number) => {
    state.memory[0x0100 | state.SP] = value;
    state.SP--;
    return state;
};

export const pushWord = (state: State, value: number) => {
    state.memory[0x0100 | state.SP] = value >> 8;
    state.memory[0x0100 | (state.SP - 1)] = value & 0xff;
    state.SP -= 2;
    return state;
};

export const popByte = (state: State) => {
    state.SP++;
    return state.memory[0x0100 | state.SP];
};

export const popWord = (state: State) => {
    state.SP += 2;
    return (state.memory[0x0100 | state.SP] << 8) | (state.memory[0x0100 | (state.SP - 1)] & 0xFFFF);
};

// IRQ
export const performIRQ = (state: State, offset: number, brk = false) => {
    pushWord(state, state.PC);
    pushByte(state, getSR(state, brk));
    state.IF = true;
    state.PC = getWord(state, offset);
    return state;
};

// Decimal Mode
export const decodeBCD = (operand: number) => (operand >> 4) * 10 + (operand & 0x0F);
export const encodeBCD = (value: number) => (Math.floor(value / 10) << 4) + (value % 10);
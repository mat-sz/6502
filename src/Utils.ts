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

export type InstructionFunction = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction) => State;

export type GetMemoryFunction = (offset: number) => number;
export type SetMemoryFunction = (offset: number, value: number) => void;

export interface InstructionProps {
    address: number,
    operand: number,
    setOperand: (value: number) => void,
    pushByte: (value: number) => void,
    pushWord: (value: number) => void,
    popByte: () => number,
    popWord: () => number,
    performIRQ: (offset: number, brk?: boolean) => void,
};

export interface Instruction {
    addressMode: AddressMode,
    bytes: number,
    cycles: number,
    fn: InstructionFunction,
    name: string,
};

const getWord = (state: State, getMemory: GetMemoryFunction, offset: number) => ((getMemory(offset + 1) << 8 | getMemory(offset)) & 0xFFFF);
const getImmediateWord = (state: State, getMemory: GetMemoryFunction) => getWord(state, getMemory, state.PC + 1);
const getImmediateByte = (state: State, getMemory: GetMemoryFunction) => getMemory(state.PC + 1);

const getAddress = (state: State, getMemory: GetMemoryFunction, mode: AddressMode) => {
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
            let value = getImmediateByte(state, getMemory);
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

const getOperand = (state: State, getMemory: GetMemoryFunction, mode: AddressMode) => {
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

const setOperand = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction, mode: AddressMode, value: number) => {
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

export const createInstruction = (
    fn: ((state: State, props: InstructionProps) => State) | ((state: State) => State),
    addressMode: AddressMode, bytes: number, cycles: number) => {

    return {
        addressMode: addressMode,
        bytes: bytes,
        cycles: cycles,
        name: (fn as any).name ? (fn as any).name : 'XYZ',
        fn: (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction) => {
            state.A = state.A & 0xFF;
            state.X = state.X & 0xFF;
            state.Y = state.Y & 0xFF;
            state.SP = state.SP & 0xFF;
            
            const result = fn(state, {
                address: getAddress(state, getMemory, addressMode),
                operand: getOperand(state, getMemory, addressMode),
                setOperand: (value: number) => setOperand(state, getMemory, setMemory, addressMode, value),
                pushByte: (value: number) => pushByte(state, setMemory, value),
                pushWord: (value: number) => pushWord(state, setMemory, value),
                popByte: () => popByte(state, getMemory),
                popWord: () => popWord(state, getMemory),
                performIRQ: (offset: number, brk = false) => performIRQ(state, getMemory, setMemory, offset, brk),
            });
            result.PC += bytes;
            result.cycles += cycles;
            
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
export const pushByte = (state: State, setMemory: SetMemoryFunction, value: number) => {
    setMemory(0x0100 | state.SP, value);
    state.SP--;
    return state;
};

export const pushWord = (state: State, setMemory: SetMemoryFunction, value: number) => {
    setMemory(0x0100 | state.SP, value >> 8);
    setMemory(0x0100 | (state.SP - 1), value & 0xff);
    state.SP -= 2;
    return state;
};

export const popByte = (state: State, getMemory: GetMemoryFunction) => {
    state.SP++;
    return getMemory(0x0100 | state.SP);
};

export const popWord = (state: State, getMemory: GetMemoryFunction) => {
    state.SP += 2;
    return (getMemory(0x0100 | state.SP) << 8) | (getMemory(0x0100 | (state.SP - 1)) & 0xFFFF);
};

// IRQ
export const performIRQ = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction, offset: number, brk = false) => {
    pushWord(state, setMemory, state.PC);
    pushByte(state, setMemory, getSR(state, brk));
    state.IF = true;
    state.PC = getWord(state, getMemory, offset);
    return state;
};

// Decimal Mode
export const decodeBCD = (operand: number) => (operand >> 4) * 10 + (operand & 0x0F);
export const encodeBCD = (value: number) => (Math.floor(value / 10) << 4) + (value % 10);
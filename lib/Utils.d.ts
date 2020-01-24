import { State } from '.';
export declare enum AddressMode {
    ACCUMULATOR = 0,
    ABSOLUTE = 1,
    ABSOLUTE_X = 2,
    ABSOLUTE_Y = 3,
    IMMEDIATE = 4,
    IMPLIED = 5,
    INDIRECT = 6,
    INDIRECT_X = 7,
    INDIRECT_Y = 8,
    RELATIVE = 9,
    ZEROPAGE = 10,
    ZEROPAGE_X = 11,
    ZEROPAGE_Y = 12
}
export declare type InstructionFunction = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction) => State;
export declare type GetMemoryFunction = (offset: number) => number;
export declare type SetMemoryFunction = (offset: number, value: number) => void;
export interface InstructionProps {
    address: number;
    operand: number;
    setOperand: (value: number) => void;
    pushByte: (value: number) => void;
    pushWord: (value: number) => void;
    popByte: () => number;
    popWord: () => number;
    performIRQ: (offset: number, brk?: boolean) => void;
}
export interface Instruction {
    addressMode: AddressMode;
    bytes: number;
    cycles: number;
    fn: InstructionFunction;
    name: string;
}
export declare const createInstruction: (fn: ((state: State, props: InstructionProps) => State) | ((state: State) => State), addressMode: AddressMode, bytes: number, cycles: number) => Instruction;
export declare const getSR: (state: State, brk?: boolean) => number;
export declare const setSR: (state: State, value: number) => State;
export declare const pushByte: (state: State, setMemory: SetMemoryFunction, value: number) => State;
export declare const pushWord: (state: State, setMemory: SetMemoryFunction, value: number) => State;
export declare const popByte: (state: State, getMemory: GetMemoryFunction) => number;
export declare const popWord: (state: State, getMemory: GetMemoryFunction) => number;
export declare const performIRQ: (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction, offset: number, brk?: boolean) => State;
export declare const decodeBCD: (operand: number) => number;
export declare const encodeBCD: (value: number) => number;

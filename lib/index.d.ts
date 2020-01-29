import { GetMemoryFunction, SetMemoryFunction } from './Utils';
export declare const MEMORY_SIZE = 65536;
export declare class State {
    PC: number;
    SP: number;
    A: number;
    X: number;
    Y: number;
    NF: boolean;
    VF: boolean;
    DF: boolean;
    IF: boolean;
    ZF: boolean;
    CF: boolean;
    NMI: boolean;
    IRQ: boolean;
    cycles: number;
}
/**
 * Executes next instruction.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 * @returns State
 */
export declare const step: (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction) => State;
/**
 * Performs an interrupt.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 * @param offset Reset vector
 * @param brk Is a BRK
 * @param push Should push PC and SR?
 */
export declare const performIRQ: (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction, offset: number, brk?: boolean, push?: boolean) => State;

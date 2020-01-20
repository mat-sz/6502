export const MEMORY_SIZE = 65536;

export interface State {
    PC: number;
    SP: number;
    
    A: number;
    X: number;
    Y: number;

    NF: boolean; // Negative flag
    VF: boolean; // Overflow flag
    DF: boolean; // Decimal flag
    IF: boolean; // Interrupt flag
    ZF: boolean; // Zero flag
    CF: boolean; // Carry flag

    memory: Uint8Array; // Memory (at most 64KiB)

}

export class CPU {
    private state: State = {
        PC: 0,
        SP: 0,

        A: 0,
        X: 0,
        Y: 0,

        NF: false,
        VF: false,
        DF: false,
        IF: true,
        ZF: false,
        CF: false,

        memory: new Uint8Array(MEMORY_SIZE),
    };

    constructor() {

    }
};
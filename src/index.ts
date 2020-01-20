import instructionSet from './InstructionSet';
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
};

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

    /**
     * Loads data into memory at a given offset
     * @param offset 
     * @param data 
     * @param updatePC Should the program counter be updated to the given offset. (true by default)
     */
    load(offset: number, data: Uint8Array, updatePC = true) {
        if (offset + data.length > MEMORY_SIZE) {
            throw new Error('Memory out of bounds.');
        }

        this.state.memory.set(data, offset);

        if (updatePC) {
            this.state.PC = offset;
        }
    }

    /**
     * Executes next instruction.
     */
    step() {
        const code = this.state.memory[this.state.PC];
        if (code in instructionSet) {
            this.state = instructionSet[code].fn(this.state);
        } else {
            throw new Error('Unsupported opcode. ' + code.toString(16) + ' at ' + this.state.PC.toString(16));
        }
        
        if (this.state.DF) {
            throw new Error('Decimal mode is not supported yet.');
        }
    }

    /**
     * Starts execution from a given address.
     * @param address 
     */
    execute(address: number) {
        let oldPC = 0;
        this.state.PC = address;

        while (this.state.PC != oldPC) {
            oldPC = this.state.PC;
            this.step();
        }

        return this.state;
    }
};
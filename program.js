import blockRegistry from './blocks.js';

export async function executeProgram(program, ctx) {
    const state = {};
    for (const block of program) {
        const def = blockRegistry[block.type];
        await def.execute(block.params, ctx, state);
    }
}
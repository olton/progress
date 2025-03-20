import process from 'node:process';
import readline from 'node:readline';

export const clear = (terminal = process.stderr, cursorTo = 0, clearMode = 0) => {
    readline.cursorTo(terminal, cursorTo);
    readline.clearLine(terminal, clearMode);
}


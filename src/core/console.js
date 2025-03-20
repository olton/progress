import process from 'node:process';
import readline from 'node:readline';

const terminal = process.stderr.isTTY
    ? process.stderr
    : (process.stdout.isTTY ? process.stdout : undefined);

export const clear = (cursorTo = 0, clearMode = 0) => {
    readline.cursorTo(terminal, cursorTo);
    readline.clearLine(terminal, clearMode);
}

export const cursor = {
    show: () => terminal.write('\u001B[?25h'),
    hide: () => terminal.write('\u001B[?25l'),
}

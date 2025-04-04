import process from 'node:process'
import readline from 'node:readline'

export const clear = (terminal = process.stderr, cursorTo = 0, clearMode = 0) => {
  readline.cursorTo(terminal, cursorTo)
  readline.clearLine(terminal, clearMode)
}

export const clearLine = (terminal = process.stderr, clearMode = 0) => {
  readline.clearLine(terminal, clearMode)
}

export function clearConsole () {
  // Для Windows используем команду cls, для Unix-подобных - clear
  const isWindows = process.platform === 'win32'
  process.stdout.write(isWindows ? '\x1bc' : '\x1b[2J\x1b[0f')
}

export const getCursorPos = () => new Promise((resolve) => {
  const termcodes = { cursorGetPosition: '\u001b[6n' };
  const rawMode = process.stdin.isRaw

  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  const readfx = function () {
    const buf = process.stdin.read();
    const str = JSON.stringify(buf); // "\u001b[9;1R"
    const regex = /\[(.*)/g;
    const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
    const pos = { y: xy[0], x: xy[1] };
    process.stdin.setRawMode(rawMode);
    resolve(pos);
  }

  process.stdin.once('readable', readfx);
  process.stdout.write(termcodes.cursorGetPosition);
})

export const getTerminalSize = () => {
  const { rows, columns } = process.stdout
  return { rows, cols: columns }
}

export const cursor = (mode = true) => {
  mode ? process.stdout.write('\u001B[?25h') : process.stdout.write('\u001B[?25l')
}

export const showCursor = () => {
  cursor(true)
}

export const hideCursor = () => {
  cursor(false)
}


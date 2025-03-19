import chalk from "chalk";

export const color = (c) => {
    return c.startsWith('#') ? chalk.hex(c) : chalk[c]
}

export default ({bar, process, complete}) => {
    return {
        bar: bar ? color(bar) : chalk.whiteBright,
        process: process ? color(process) : chalk.white,
        complete: complete ? color(complete) : chalk.green,
    }
}
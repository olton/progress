import chalk from 'chalk'
import { RenderOptions } from '../options.js'
import process from 'node:process'

export default function (state = {}) {
  const {
    percent,
    filledWidth,
    emptyWidth,
    elapsed,
    rate,
    completed,
    total,
    color = 'green'
  } = Object.assign({}, RenderOptions, state)

  process.stdout.write('\r')
  process.stdout.write(chalk.cyan(`[${chalk[color]('█'.repeat(filledWidth))}${' '.repeat(emptyWidth > 0 ? emptyWidth : 0)}] ${percent}% `))
  process.stdout.write(chalk.yellow(`(${completed}/${total}) `))
  process.stdout.write(chalk.gray(`${elapsed}s elapsed, ${rate}s/unit`))
}

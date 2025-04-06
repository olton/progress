import RenderOptions from '../options/render.js'
import process from 'node:process'
import { term } from '@olton/terminal'

export default function (state = {}) {
  const {
    percent,
    filledWidth,
    emptyWidth,
    elapsed,
    rate,
    completed,
    total,
    color = 'green',
    processMessage,
    processMessageColor = 'gray',
    barSymbol = '◼',
  } = Object.assign({}, RenderOptions, state)

  const message = processMessage
    .replace(/{{percent}}/g, percent)
    .replace(/{{completed}}/g, completed)
    .replace(/{{total}}/g, total)
    .replace(/{{elapsed}}/g, elapsed)
    .replace(/{{rate}}/g, rate)

  process.stdout.write('\r')
  process.stdout.write(term(`${term(`[${barSymbol[0].repeat(filledWidth)}${term(' '.repeat(emptyWidth > 0 ? emptyWidth : 0), { color: 'default' })}]`, { color })} ${message}`, { color: processMessageColor }))
}

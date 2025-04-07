import RenderOptions from '../options/render.js'
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
    bar = '◼',
  } = Object.assign({}, RenderOptions, state)

  const message = processMessage
    .replace(/{{percent}}/g, percent)
    .replace(/{{completed}}/g, completed)
    .replace(/{{total}}/g, total)
    .replace(/{{elapsed}}/g, elapsed)
    .replace(/{{rate}}/g, rate)

  const t = process.stdout
  
  t.write('\r')
  t.write(term(`${term(`[${bar[0].repeat(filledWidth)}${term(' '.repeat(emptyWidth > 0 ? emptyWidth : 0), { color: 'default' })}]`, { color })} ${message}`, { color: processMessageColor }))
}

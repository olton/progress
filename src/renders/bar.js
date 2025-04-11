import RenderOptions from '../options/render.js'
import { term } from '@olton/terminal'


export default function (terminal, state = {}) {
  const {
    percent,
    filledWidth,
    emptyWidth,
    elapsed,
    rate,
    completed,
    total,
    color = 'green',
    message,
    messageColor = 'gray',
    bar = '◼',
  } = Object.assign({}, RenderOptions, state)
  
  const msg = message
    .replace(/{{percent}}/g, percent)
    .replace(/{{completed}}/g, completed)
    .replace(/{{total}}/g, total)
    .replace(/{{elapsed}}/g, elapsed)
    .replace(/{{rate}}/g, rate)

  terminal.write('\r')
  terminal.write(term(`${term(`[${bar[0].repeat(filledWidth)}${term(' '.repeat(emptyWidth > 0 ? emptyWidth : 0), { color: 'default' })}]`, { color })} ${msg}`, { color: messageColor }))
}

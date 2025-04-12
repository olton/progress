import RenderOptions from '../options/render.js'
import { term, Screen } from '@olton/terminal'

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
    backColor,
    unitName = 'unit',
    bar = '█',
    empty = '░',
  } = Object.assign({}, RenderOptions, state)
  
  terminal.write('\r')
  Screen.clearLine()
  terminal.write(term(`[${bar[0].repeat(filledWidth)}${term(empty[0].repeat(emptyWidth > 0 ? emptyWidth : 0), {color: backColor})}] ${percent}% `, {color}))
  terminal.write(term(`(${completed}/${total}) `, {color: 'yellow'}))
  terminal.write(term(`${elapsed}s elapsed, ${rate}s/${unitName}`, {color: 'gray'}))
}

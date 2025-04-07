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
    backColor,
    unitName = 'unit',
    bar = '█',
    empty = '░',
  } = Object.assign({}, RenderOptions, state)

  const t = process.stdout
  
  t.write('\r')
  t.write(term(`[${bar[0].repeat(filledWidth)}${term(empty[0].repeat(emptyWidth > 0 ? emptyWidth : 0), {color: backColor})}] ${percent}% `, {color}))
  t.write(term(`(${completed}/${total}) `, {color: 'yellow'}))
  t.write(term(`${elapsed}s elapsed, ${rate}s/${unitName}`, {color: 'gray'}))
}

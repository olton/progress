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
    unitName = 'unit',
  } = Object.assign({}, RenderOptions, state)

  process.stdout.write('\r')
  process.stdout.write(term(`[${'█'.repeat(filledWidth)}${' '.repeat(emptyWidth > 0 ? emptyWidth : 0)}] ${percent}% `, {color}))
  process.stdout.write(term(`(${completed}/${total}) `, {color: 'yellow'}))
  process.stdout.write(term(`${elapsed}s elapsed, ${rate}s/${unitName}`, {color: 'gray'}))
}

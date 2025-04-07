import RenderOptions from '../options/render.js'
import { dots, clock, moon, earth, line } from "../helpers/frames.js"
import { term, Screen } from '@olton/terminal'

const FRAMES = {
  dots,
  clock,
  moon,
  earth,
  line, 
}

let index = 0

export default function (state = {}) {
  const {
    percent,
    elapsed,
    rate,
    completed,
    total,
    color = 'green',
    processMessage,
    processMessageColor = 'gray',
    type = 'dots'
  } = Object.assign({}, RenderOptions, state)

  const frames = FRAMES[type] || FRAMES.dots

  index++
  if (index >= frames.length) {
    index = 0
  }

  const frame = completed >= total ? '√' : frames[index]
  const message = processMessage
    .replace(/{{percent}}/g, percent)
    .replace(/{{completed}}/g, completed)
    .replace(/{{total}}/g, total)
    .replace(/{{elapsed}}/g, elapsed)
    .replace(/{{rate}}/g, rate)

  const t = process.stdout
  
  t.write("\r")
  t.write(term(`${frame} ${term(message, {color: processMessageColor})} `, { color }))
  Screen.clearRight()
}

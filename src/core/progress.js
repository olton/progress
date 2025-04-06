import process from 'node:process'
import ProgressOptions from '../options/progress.js'
import RenderOptions from '../options/render.js'
import defaultRender from '../renders/default.js'
import dotsRender from '../renders/dots.js'
import barRender from '../renders/bar.js'
import repeat from '../helpers/repeat.js'
import { Cursor, term, Screen } from "@olton/terminal"

const RENDERS = {
  default: defaultRender,
  dots: dotsRender,
  bar: barRender
}

export default class Progress {
  total = 0
  completed = 0
  start = 0
  options = {}
  position = null
  cursor = null

  constructor (options = {}) {
    this.options = Object.assign({}, ProgressOptions, options)
    this.setup()
  }

  destroy () {
    Cursor.show()
  }
  
  setup () {
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
    this.start = Date.now()
    if (this.options.cursor === false) {
      Cursor.hide()
    }
  }

  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  async init (msg = '') {
    const o = this.options
    if (msg) { o.processMessage = msg }
    if (o.spaceBefore) { process.stdout.write(repeat('\n', o.spaceBefore)) }
    const cur = await Cursor.getPos()
    this.position = { ...cur }
    this.render()
    if (o.spaceAfter) {
      process.stdout.write(repeat('\n', o.spaceAfter + 1))
    } else {
      process.stdout.write('\n')
    }
  }
  
  process (step = 1, msg = '') {
    this.completed += step
    if (msg) {
      this.options.processMessage = msg
    }
    this.render()
  }

  completeMessage () {
    const { completeMessageColor, completeMessage } = this.options

    Cursor.show()
    
    if (!completeMessage) {
      return
    }

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
    const message = completeMessage
      .replace(/{{total}}/g, this.total)
      .replace(/{{elapsed}}/g, elapsed)

    if (['default', 'inline'].includes(this.options.completeMessagePosition)) {
      process.stdout.write('\r')
    } else {
      process.stdout.write('\n')
    }

    Screen.clearLine()
    process.stdout.write(term(message, {color: completeMessageColor}))
  }

  calculate () {
    const percent = this.total ? Math.round((this.completed / this.total) * 100) : 0
    const filledWidth = this.total ? Math.round((this.completed / this.total) * this.options.width) : 0
    const emptyWidth = this.options.width - filledWidth

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(1)
    const rate = this.completed ? (elapsed / this.completed).toFixed(2) : '0.00'

    return Object.assign({}, RenderOptions, {
      percent,
      filledWidth,
      emptyWidth,
      elapsed,
      rate,
      completed: this.completed,
      total: this.options.total,
      color: this.options.barColor,
      processMessage: this.options.processMessage,
      processMessageColor: this.options.processMessageColor,
      type: this.options.dotsType,
      unitName: this.options.unitName,
      barSymbol: this.options.barSymbol,
    })
  }

  render () {
    const state = this.calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    if (this.position) {
      Cursor.to(+this.position.x - 1, +this.position.y - 1)
      // process.stdout.cursorTo(+this.position.x - 1, +this.position.y - 1)
    }
    render(state)

    if (this.completed >= this.options.total) {
      this.completeMessage()
    }
  }
}

import process from 'node:process'
import ProgressOptions from '../options/progress.js'
import RenderOptions from '../options/render.js'
import { color } from '../helpers/color.js'
import { clearLine, cursor, getCursorPos } from '../helpers/console.js'
import defaultRender from '../renders/default.js'
import dotsRender from '../renders/dots.js'
import barRender from '../renders/bar.js'
import repeat from '../helpers/repeat.js'

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

  constructor (options = {}) {
    this.options = Object.assign({}, ProgressOptions, options)
    this.setup()
  }

  destroy () {
    cursor(true)
  }
  
  setup () {
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
    this.start = Date.now()
    cursor( this.options.cursor )
  }

  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  async init (msg = '') {
    const o = this.options
    if (msg) { o.processMessage = msg }
    if (o.spaceBefore) { process.stdout.write(repeat('\n', o.spaceBefore)) }
    const cur = await getCursorPos()
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
    const { completeMessageColor, completeMessage, showCompleteMessage } = this.options

    cursor(true)
    
    if (!showCompleteMessage) {
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

    clearLine(process.stdout, 0)
    process.stdout.write(color(completeMessageColor)(message))
  }

  calculate () {
    const percent = Math.round((this.completed / this.total) * 100)
    const filledWidth = Math.round((this.completed / this.total) * this.options.width)
    const emptyWidth = this.options.width - filledWidth

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(1)
    const rate = this.completed > 0 ? (elapsed / this.completed).toFixed(2) : '0.00'

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
    })
  }

  render () {
    const state = this.calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    if (this.position) {
      process.stdout.cursorTo(+this.position.x - 1, +this.position.y - 1)
    }
    render(state)

    if (this.completed >= this.options.total) {
      this.completeMessage()
    }
  }
}

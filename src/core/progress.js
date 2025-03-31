import process from 'node:process'
import { ProgressOptions, RenderOptions } from './options.js'
import { color } from './color.js'
import { clear } from './console.js'
import defaultRender from './renders/default.js'
import dotsRender from './renders/dots.js'
import barRender from './renders/bar.js'

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
  terminal = null

  constructor (options = {}) {
    this.options = Object.assign({}, ProgressOptions, options)
    this.terminal = process.stderr.isTTY
      ? process.stderr
      : (process.stdout.isTTY ? process.stdout : undefined)
    this.setup()
  }

  cursor (mode = true) {
    mode ? this.terminal.write('\u001B[?25h') : this.terminal.write('\u001B[?25l')
  }

  setup () {
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
    this.start = Date.now()
    this.cursor(false)
    this.render()
  }

  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  process (step = 1, processMessage = '') {
    this.completed += step
    if (processMessage) {
      this.options.processMessage = processMessage
    }
    this.render()
  }

  completeMessage () {
    const { completeMessageColor, completeMessage, showCompleteMessage } = this.options
    if (!showCompleteMessage) {
      return
    }

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
    const message = completeMessage
      .replace(/{{total}}/g, this.total)
      .replace(/{{elapsed}}/g, elapsed)

    process.stdout.write(['default', 'inline'].includes(this.options.completeMessagePosition) ? '\r' : '\n')
    clear(this.terminal, 0, 1)
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
      type: this.options.dotsType
    })
  }

  render () {
    const state = this.calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    render(state)

    if (this.completed >= this.options.total) {
      this.cursor(true)
      this.completeMessage()
    }
  }
}

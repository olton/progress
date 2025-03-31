import process from 'node:process'
import { ProgressOptions, RenderOptions } from './options.js'
import { color } from './color.js'
import { clear, getCursorPosSync } from './console.js'
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
  position = { cols: 0, rows: 0 }

  constructor (options = {}) {
    this.options = Object.assign({}, ProgressOptions, options)
    this.terminal = process.stderr.isTTY
      ? process.stderr
      : (process.stdout.isTTY ? process.stdout : undefined)
    this.setup()
  }

  destroy () {
    this.cursor(true)
  }
  
  cursor (mode = true) {
    mode ? this.terminal.write('\u001B[?25h') : this.terminal.write('\u001B[?25l')
  }

  hideCursor () {
    this.cursor(false)
  }
  
  showCursor () {
    this.cursor(true)
  }
  
  setup () {
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
    this.start = Date.now()
    this.cursor(false)
    if (this.options.render) { this.render() }
  }

  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  init (msg) {
    if (msg && typeof msg === 'string') {
      this.options.processMessage = msg
    }
    this.position = { x: 0, y: 0 }
    this.render()
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
    this.showCursor()
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
      type: this.options.dotsType,
      unitName: this.options.unitName,
    })
  }

  render () {
    const state = this.calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    render(state)

    if (this.completed >= this.options.total) {
      this.completeMessage()
    }
  }
}

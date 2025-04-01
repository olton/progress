import process from 'node:process'
import { ProgressOptions, RenderOptions } from './options.js'
import { color } from './color.js'
import { clearLine, cursor, getCursorPos } from './console.js'
import defaultRender from './renders/default.js'
import dotsRender from './renders/dots.js'
import barRender from './renders/bar.js'

const RENDERS = {
  default: defaultRender,
  dots: dotsRender,
  bar: barRender
}

const repeat = (str, count) => {
  let result = ''
  for (let i = 0; i < count; i++) {
    result += str
  }
  return result
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

  async init (msg) {
    if (msg && typeof msg === 'string') {
      this.options.processMessage = msg
    }
    if (this.options.spaceBefore) {
      process.stdout.write(repeat('\n', this.options.spaceBefore))
    }
    const cur = await getCursorPos()
    this.position = { ...cur }
    this.render()
    if (this.options.spaceAfter) {
      process.stdout.write(repeat('\n', this.options.spaceAfter + 1))
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

import ProgressOptions from '../options/progress.js'
import RenderOptions from '../options/render.js'
import defaultRender from '../renders/default.js'
import dotsRender from '../renders/dots.js'
import barRender from '../renders/bar.js'
import repeat from '../helpers/repeat.js'
import { Cursor, term, Screen } from "@olton/terminal"

const terminal = process.stdout

const RENDERS = {
  default: defaultRender,
  dots: dotsRender,
  bar: barRender
}

/**
 * Progress class for displaying a progress bar in the terminal.
 */
export default class Progress {
  total = 0
  completed = 0
  start = 0
  options = {}
  position = null
  cursor = null

  constructor (options = {}) {
    this.options = Object.assign({}, ProgressOptions, options)
    this.#setup()
  }

  /**
   * Sets up the initial state of the Progress instance.
   */
  #setup () {
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
    this.start = Date.now()
    if (this.options.cursor === false) {
      Cursor.hide()
    }
  }

  /**
   * Resets the Progress instance with new options.
   * @param options
   */
  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.#setup()
  }

  /**
   * Initializes the Progress instance, displaying the progress bar and save cursor position.
   * @param msg
   * @returns {Promise<void>}
   */
  async init (msg = '') {
    const o = this.options
    if (msg) { o.processMessage = msg }
    if (o.spaceBefore) { terminal.write(repeat('\n', o.spaceBefore)) }
    const cur = await Cursor.getPos()
    this.position = { ...cur }
    this.#render()
    if (o.spaceAfter) {
      terminal.write(repeat('\n', o.spaceAfter + 1))
    } else {
      terminal.write('\n')
    }
  }

  /**
   * Processes the progress bar, updating the message if provided.
   * @param step
   * @param msg
   */
  process (step = 1, msg = '') {
    this.completed += step
    if (msg) {
      this.options.processMessage = msg
    }
    this.#render()
  }

  /**
   * Displays the complete message when the progress is finished.
   */
  #completeMessage () {
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
      terminal.write('\r')
    } else {
      terminal.write('\n')
    }

    Screen.clearLine()
    terminal.write(term(message, {color: completeMessageColor}))
  }

  /**
   * Calculates the progress state.
   * @returns {{percent: number, filledWidth: number, emptyWidth: number, elapsed: number, rate: number, completed: number, total: number, color: string, processMessage: string, processMessageColor: string, type: string, unitName: string, bar: string, empty: string} & {percent: (number|number), filledWidth: (number|number), emptyWidth: number, elapsed: string, rate: (string|string), completed: number, total: *, color: (string|string|*), processMessage: (string|string|*), processMessageColor: (string|string|*), type: (string|string|*), unitName: (string|string|*), bar: (string|any), empty: *}}
   */
  #calculate () {
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
      backColor: this.options.backColor,
      processMessage: this.options.processMessage,
      processMessageColor: this.options.processMessageColor,
      type: this.options.dotsType,
      unitName: this.options.unitName,
      bar: this.options.bar,
      empty: this.options.empty,
    })
  }

  /**
   * Renders the progress bar in the terminal.
   */
  #render () {
    const state = this.#calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    if (this.position) {
      Cursor.to(+this.position.x - 1, +this.position.y - 1)
    }
    render(state)

    if (this.completed >= this.options.total) {
      this.#completeMessage()
    }
  }
}

import repeat from '../helpers/repeat.js'
import { Cursor, Screen, term } from '@olton/terminal'

export default class Base {
  terminal = process.stdout
  options = {}
  position = null
  
  constructor (defaults, options) {
    this.options = Object.assign({}, defaults, options)
    this.setup()
  }

  /**
   * Sets up the initial state of the Activity instance.
   */
  setup () {
    this.start = Date.now()
    if (this.options.cursor === false) {
      Cursor.hide()
    }
  }

  /**
   * Resets the Activity instance with new options.
   * @param options
   */
  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  write (msg) {
    this.terminal.write(msg)
  }
  
  /**
   * Initializes the Activity instance, displaying the loading animation and save cursor position.
   * @param msg
   * @returns {Promise<void>}
   */
  async init (msg = '') {
    const o = this.options
    if (msg) { o.message = msg }
    if (o.spaceBefore) { this.write(repeat('\n', this.options.spaceBefore)) }
    const cur = await Cursor.getPos()
    this.position = { ...cur }
    this.render()
    this.write(repeat('\n', this.options.spaceAfter + 1))
  }

  /**
   * Sets the cursor position to the specified coordinates.
   * @param x
   * @param y
   */
  here (x = 0, y = 0) {
    this.position = { x, y }
    Cursor.to(x, y)
  }
  
  /**
   * Processes the loading animation, updating the message if provided.
   * @param msg
   * @param step
   */
  process (msg = '', step = 1) {
    if (msg) {
      this.options.message = msg
    }
    // console.log(this.options.message)
    this.render()
  }

  render () {
    throw new Error('Method render() must be implemented in derived classes')
  }

  /**
   * Displays the completion message after stopping the loading animation.
   * @param msg
   */
  completeMessage (msg) {
    let { completeMessageColor, completeMessage } = this.options

    if (msg) { completeMessage = msg }
    if (!completeMessage) { return }

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
    const message = completeMessage
      .replace(/{{elapsed}}/g, elapsed)

    this.write('\r')

    Screen.clearLine()
    this.write(term(message, {color: completeMessageColor}))
  }
}